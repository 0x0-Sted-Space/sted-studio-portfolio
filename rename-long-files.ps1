
# PowerShell script to rename files with excessively long names
# This script will rename files to shorter, more manageable names

Write-Host "Starting file renaming process..." -ForegroundColor Green

# Counter for generating unique names
$counter = 1

# Function to generate a clean filename based on content and type
function Get-CleanFileName {
    param(
        [string]$originalName,
        [string]$extension,
        [int]$counter
    )
    
    # Extract meaningful parts from the filename
    if ($originalName -like "*DALL*E*") {
        if ($originalName -like "*logo*" -or $originalName -like "*Logo*") {
            return "dalle-logo-$counter$extension"
        }
        elseif ($originalName -like "*poster*" -or $originalName -like "*Poster*") {
            return "dalle-poster-$counter$extension"
        }
        elseif ($originalName -like "*cover*" -or $originalName -like "*Cover*") {
            return "dalle-cover-$counter$extension"
        }
        elseif ($originalName -like "*dashboard*" -or $originalName -like "*Dashboard*") {
            return "dalle-dashboard-$counter$extension"
        }
        elseif ($originalName -like "*village*" -or $originalName -like "*Village*") {
            return "dalle-village-$counter$extension"
        }
        elseif ($originalName -like "*health*" -or $originalName -like "*Health*") {
            return "dalle-health-$counter$extension"
        }
        elseif ($originalName -like "*vedic*" -or $originalName -like "*Vedic*") {
            return "dalle-vedic-$counter$extension"
        }
        elseif ($originalName -like "*andhra*" -or $originalName -like "*Andhra*") {
            return "dalle-andhra-$counter$extension"
        }
        else {
            return "dalle-artwork-$counter$extension"
        }
    }
    elseif ($originalName -like "*Default*") {
        if ($originalName -like "*patronus*") {
            return "default-patronus-$counter$extension"
        }
        elseif ($originalName -like "*warrior*") {
            return "default-warrior-$counter$extension"
        }
        else {
            return "default-art-$counter$extension"
        }
    }
    elseif ($originalName -like "*file_*") {
        return "generated-file-$counter$extension"
    }
    else {
        return "artwork-$counter$extension"
    }
}

# Get all files with names longer than 100 characters
$longFiles = Get-ChildItem -Path "public/images" -Recurse -File | Where-Object { $_.Name.Length -gt 100 }

Write-Host "Found $($longFiles.Count) files with long names" -ForegroundColor Yellow

foreach ($file in $longFiles) {
    try {
        $extension = $file.Extension
        $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        
        # Generate new clean filename
        $newName = Get-CleanFileName -originalName $nameWithoutExt -extension $extension -counter $counter
        
        # Ensure the new name is unique
        $newPath = Join-Path $file.DirectoryName $newName
        while (Test-Path $newPath) {
            $counter++
            $newName = Get-CleanFileName -originalName $nameWithoutExt -extension $extension -counter $counter
            $newPath = Join-Path $file.DirectoryName $newName
        }
        
        # Rename the file
        Rename-Item -Path $file.FullName -NewName $newName -Force
        Write-Host "Renamed: $($file.Name) -> $newName" -ForegroundColor Cyan
        
        $counter++
    }
    catch {
        Write-Host "Error renaming $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "File renaming completed!" -ForegroundColor Green
Write-Host "Total files processed: $($longFiles.Count)" -ForegroundColor Green

# Also rename any files that might still be problematic (over 80 characters)
Write-Host "`nChecking for remaining long filenames..." -ForegroundColor Yellow
$stillLongFiles = Get-ChildItem -Path "public/images" -Recurse -File | Where-Object { $_.Name.Length -gt 80 }

if ($stillLongFiles.Count -gt 0) {
    Write-Host "Found $($stillLongFiles.Count) files still with long names, renaming them too..." -ForegroundColor Yellow
    
    foreach ($file in $stillLongFiles) {
        try {
            $extension = $file.Extension
            $newName = "asset-$counter$extension"
            
            # Ensure uniqueness
            $newPath = Join-Path $file.DirectoryName $newName
            while (Test-Path $newPath) {
                $counter++
                $newName = "asset-$counter$extension"
                $newPath = Join-Path $file.DirectoryName $newName
            }
            
            Rename-Item -Path $file.FullName -NewName $newName -Force
            Write-Host "Renamed: $($file.Name) -> $newName" -ForegroundColor Cyan
            $counter++
        }
        catch {
            Write-Host "Error renaming $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`nAll file renaming operations completed!" -ForegroundColor Green
