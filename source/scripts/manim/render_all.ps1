param(
    [ValidateSet('low', 'medium', 'high')]
    [string]$Quality = 'low',
    [string[]]$Only = @()
)

$ErrorActionPreference = 'Stop'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BookDir = (Resolve-Path (Join-Path $ScriptDir '..\..')).Path
$SceneFile = Join-Path $ScriptDir 'bridge_series.py'
$MediaDir = Join-Path $BookDir 'tmp\manim_media'
$OutDir = Join-Path $BookDir 'assets\videos\manim'
$PosterDir = Join-Path $OutDir 'posters'
$ConfigFile = Join-Path $ScriptDir 'manim.cfg'

New-Item -ItemType Directory -Force $MediaDir, $OutDir, $PosterDir | Out-Null

$QualityFlag = @{ low = '-ql'; medium = '-qm'; high = '-qh' }[$Quality]
$AllScenes = @(
    [pscustomobject]@{ Class='M01ForcePath'; File='M01_force_path.mp4'; Title='结构体系与力流' },
    [pscustomobject]@{ Class='M02ScaleEffect'; File='M02_scale_effect.mp4'; Title='跨径与尺度效应' },
    [pscustomobject]@{ Class='M03EccentricCore'; File='M03_eccentric_core.mp4'; Title='偏心受压与截面核心' },
    [pscustomobject]@{ Class='M04PrestressViews'; File='M04_prestress_views.mp4'; Title='预应力的三种等价表示' },
    [pscustomobject]@{ Class='M05CombinationWaterfall'; File='M05_combination_waterfall.mp4'; Title='作用组合与瀑布图' },
    [pscustomobject]@{ Class='M06InfluenceLine'; File='M06_influence_line.mp4'; Title='影响线与移动加载' },
    [pscustomobject]@{ Class='M07BoxEfficiency'; File='M07_box_efficiency.mp4'; Title='箱梁挖空与截面效率' },
    [pscustomobject]@{ Class='M08ArchThrustLine'; File='M08_arch_thrust_line.mp4'; Title='拱轴、压力线与偏心' },
    [pscustomobject]@{ Class='M09StayMatrix'; File='M09_stay_matrix.mp4'; Title='斜拉索影响矩阵与成桥状态' },
    [pscustomobject]@{ Class='M10SuspensionSag'; File='M10_suspension_sag.mp4'; Title='悬索线型、矢跨比与水平分力' },
    [pscustomobject]@{ Class='M11ThermalRestraint'; File='M11_thermal_restraint.mp4'; Title='温度变形与纵向约束' },
    [pscustomobject]@{ Class='M12ModalResonance'; File='M12_modal_resonance.mp4'; Title='模态、频比与共振' },
    [pscustomobject]@{ Class='M13WindPhenomena'; File='M13_wind_phenomena.mp4'; Title='风速平方律与风致现象' },
    [pscustomobject]@{ Class='M14TimeReliability'; File='M14_time_reliability.mp4'; Title='性能退化与时变可靠度' },
    [pscustomobject]@{ Class='M15ModelHierarchy'; File='M15_model_hierarchy.mp4'; Title='有限元模型层级与可验证性' }
)

$Scenes = $AllScenes

if ($Only.Count -gt 0) {
    $Scenes = $Scenes | Where-Object { $Only -contains $_.Class -or $Only -contains $_.File }
}

$Python = (Get-Command python).Source
$FfmpegCandidates = @(
    (Get-Command ffmpeg -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -ErrorAction SilentlyContinue),
    'D:\Python tools\ffmpeg-6.0-full_build\bin\ffmpeg.exe'
) | Where-Object { $_ -and (Test-Path $_) }
$Ffmpeg = $FfmpegCandidates | Select-Object -First 1

foreach ($Scene in $Scenes) {
    Write-Host "Rendering $($Scene.Class) -> $($Scene.File)"
    & $Python -m manim render --config_file $ConfigFile $QualityFlag --media_dir $MediaDir --output_file $Scene.File $SceneFile $Scene.Class
    if ($LASTEXITCODE -ne 0) { throw "Manim render failed: $($Scene.Class)" }

    $Rendered = Get-ChildItem -Path (Join-Path $MediaDir 'videos') -Recurse -Filter $Scene.File |
        Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $Rendered) { throw "Rendered file not found: $($Scene.File)" }
    $Destination = Join-Path $OutDir $Scene.File
    Copy-Item -LiteralPath $Rendered.FullName -Destination $Destination -Force

    $PosterName = [IO.Path]::ChangeExtension($Scene.File, '.png')
    $PosterPath = Join-Path $PosterDir $PosterName
    if ($Ffmpeg) {
        & $Ffmpeg -hide_banner -loglevel error -y -sseof -0.2 -i $Destination -frames:v 1 $PosterPath
        if ($LASTEXITCODE -ne 0) { throw "Poster extraction failed: $($Scene.File)" }
    }

    $Probe = & $Ffmpeg -hide_banner -i $Destination 2>&1 | Out-String
    $Duration = if ($Probe -match 'Duration:\s+(\d{2}):(\d{2}):(\d{2}\.\d+)') {
        [math]::Round(([int]$Matches[1] * 3600 + [int]$Matches[2] * 60 + [double]$Matches[3]), 2)
    } else { $null }
}

$ManifestItems = @()
foreach ($Scene in $AllScenes) {
    $Destination = Join-Path $OutDir $Scene.File
    if (-not (Test-Path $Destination)) { continue }
    $PosterName = [IO.Path]::ChangeExtension($Scene.File, '.png')
    $Probe = & $Ffmpeg -hide_banner -i $Destination 2>&1 | Out-String
    $Duration = if ($Probe -match 'Duration:\s+(\d{2}):(\d{2}):(\d{2}\.\d+)') {
        [math]::Round(([int]$Matches[1] * 3600 + [int]$Matches[2] * 60 + [double]$Matches[3]), 2)
    } else { $null }
    $ManifestItems += [pscustomobject]@{
        code = $Scene.File.Substring(0, 3)
        title = $Scene.Title
        scene = $Scene.Class
        file = $Scene.File
        poster = "posters/$PosterName"
        duration_seconds = $Duration
        quality = $Quality
        style = '白底·中文教材体·无旁白'
    }
}

$Manifest = [ordered]@{
    schema_version = 1
    generated_at = (Get-Date).ToString('yyyy-MM-ddTHH:mm:ssK')
    source = 'scripts/manim/bridge_series.py'
    count = $ManifestItems.Count
    videos = $ManifestItems
}
$Manifest | ConvertTo-Json -Depth 5 | Set-Content -Encoding utf8 (Join-Path $OutDir 'manifest.json')
Write-Host "Completed $($ManifestItems.Count) scene(s)."
