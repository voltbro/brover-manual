$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$buildPath = Join-Path $projectRoot 'build'
$logPath = Join-Path $projectRoot 'deploy-winscp.log'
$remotePath = '/docs.voltbro.ru/www/brover-manual'

$installRoots = @(
    ${env:ProgramFiles(x86)}
    $env:ProgramFiles
    $(if ($env:LOCALAPPDATA) { Join-Path $env:LOCALAPPDATA 'Programs' })
)

$winScpPath = $installRoots |
    Where-Object { $_ } |
    ForEach-Object { Join-Path $_ 'WinSCP\WinSCP.com' } |
    Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } |
    Select-Object -First 1

if (-not $winScpPath) {
    throw 'WinSCP.com was not found. Install the classic WinSCP application.'
}

Push-Location $projectRoot

try {
    & npm.cmd run build

    if ($LASTEXITCODE -ne 0) {
        throw "The website build failed with exit code $LASTEXITCODE. Deployment was cancelled."
    }

    if (-not (Test-Path -LiteralPath (Join-Path $buildPath 'index.html') -PathType Leaf)) {
        throw 'build/index.html was not found. Deployment was cancelled.'
    }

    $syncCommand = 'synchronize remote -delete "' + $buildPath + '" "' + $remotePath + '"'
    $winScpArguments = @(
        "/log=$logPath"
        '/loglevel=1'
        '/command'
        'option batch abort'
        'option confirm off'
        'option reconnecttime 300'
        'open voltbro'
        $syncCommand
        'exit'
    )

    & $winScpPath @winScpArguments

    if ($LASTEXITCODE -ne 0) {
        throw "WinSCP failed with exit code $LASTEXITCODE. See the log: $logPath"
    }
}
finally {
    Pop-Location
}
