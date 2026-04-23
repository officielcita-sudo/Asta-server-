param(
    [string]$JavaPath,
    [int]$Port = 25565,
    [string]$LevelName = "world",
    [string]$Motd = "FTB Presents Stoneblock 2",
    [switch]$AutoConfirmRegistry
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$serverRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverProperties = Join-Path $serverRoot "server.properties"
$jvmArgsFile = Join-Path $serverRoot "user_jvm_args.txt"
$forgeJar = Join-Path $serverRoot "forge-1.12.2-14.23.5.2846-universal.jar"

function Set-ServerProperty {
    param(
        [string]$Key,
        [string]$Value
    )

    if (-not (Test-Path -LiteralPath $serverProperties)) {
        throw "Missing server.properties at $serverProperties"
    }

    $raw = Get-Content -LiteralPath $serverProperties -Raw
    if ($raw -match "(?m)^$([regex]::Escape($Key))=") {
        $updated = [regex]::Replace(
            $raw,
            "(?m)^$([regex]::Escape($Key))=.*$",
            "$Key=$Value"
        )
    } else {
        $updated = $raw.TrimEnd("`r", "`n") + "`r`n$Key=$Value`r`n"
    }

    Set-Content -LiteralPath $serverProperties -Value $updated -Encoding ASCII
}

function Resolve-Java8 {
    param([string]$ExplicitPath)

    $candidates = @()

    if ($ExplicitPath) {
        $candidates += $ExplicitPath
    }

    if ($env:JAVA8_HOME) {
        $candidates += (Join-Path $env:JAVA8_HOME "bin\\java.exe")
    }

    $candidates += @(
        "C:\\Program Files\\Java\\jre-1.8\\bin\\java.exe",
        "C:\\Program Files\\Java\\jdk1.8.0_401\\bin\\java.exe",
        "C:\\Program Files\\Java\\jdk1.8.0_402\\bin\\java.exe"
    )

    foreach ($candidate in $candidates) {
        if ($candidate -and (Test-Path -LiteralPath $candidate)) {
            return $candidate
        }
    }

    throw "Java 8 was not found. Set JAVA8_HOME or pass -JavaPath to a Java 8 java.exe."
}

if (-not (Test-Path -LiteralPath $forgeJar)) {
    throw "Missing Forge server jar at $forgeJar"
}

Set-Location -LiteralPath $serverRoot
Set-ServerProperty -Key "server-port" -Value $Port
Set-ServerProperty -Key "level-name" -Value $LevelName
Set-ServerProperty -Key "motd" -Value $Motd

$resolvedJava = Resolve-Java8 -ExplicitPath $JavaPath
$jvmArgs = @()

if (Test-Path -LiteralPath $jvmArgsFile) {
    $jvmArgs = Get-Content -LiteralPath $jvmArgsFile |
        Where-Object { $_.Trim() -and -not $_.Trim().StartsWith("#") }
}

$arguments = @()
if ($AutoConfirmRegistry) {
    $arguments += "-Dfml.queryResult=confirm"
}

$arguments += $jvmArgs
$arguments += @("-jar", $forgeJar, "nogui")

Write-Host "Starting Stoneblock 2 server on port $Port with $resolvedJava"
& $resolvedJava @arguments
