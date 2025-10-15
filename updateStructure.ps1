# PowerShell Script to Reorganize Project Structure for SocialBridge

# This script creates a new folder structure and moves select files to align with a MERN stack modular layout.

# --- Client Setup ---
# Create new directories for client assets and components
New-Item -ItemType Directory -Path "./client/public/assets/images" -Force;
New-Item -ItemType Directory -Path "./client/src/assets" -Force;
New-Item -ItemType Directory -Path "./client/src/components/common" -Force;
New-Item -ItemType Directory -Path "./client/src/components/forms" -Force;
New-Item -ItemType Directory -Path "./client/src/components/threads" -Force;
New-Item -ItemType Directory -Path "./client/src/hooks" -Force;
New-Item -ItemType Directory -Path "./client/src/pages" -Force;
New-Item -ItemType Directory -Path "./client/src/services" -Force;

# Move Home.js from src root to src/pages
if (Test-Path "./client/src/Home.js") {
    Move-Item "./client/src/Home.js" "./client/src/pages/Home.js" -Force;
    Write-Host "Moved Home.js to client/src/pages/Home.js";
} else {
    Write-Host "Home.js not found in client/src/";
}

# Add additional Move-Item commands here for other client files as needed

# --- Server Setup ---
# Create new directories for server config and utils
New-Item -ItemType Directory -Path "./server/config" -Force;
New-Item -ItemType Directory -Path "./server/utils" -Force;

# Move configuration file db.js to server/config
if (Test-Path "./server/db.js") {
    Move-Item "./server/db.js" "./server/config/db.js" -Force;
    Write-Host "Moved db.js to server/config/db.js";
} else {
    Write-Host "db.js not found in server/";
}

# Move miscellaneous server files into utils (adjust as needed)
$serverMoves = @{
    "./server/auth.js" = "./server/utils/auth.js";
    "./server/authMiddleware.js" = "./server/utils/authMiddleware.js";
    "./server/dashboardRoutes.js" = "./server/utils/dashboardRoutes.js";
    "./server/Message.js" = "./server/utils/Message.js";
    "./server/Session.js" = "./server/utils/Session.js";
    "./server/sessionRoutes.js" = "./server/utils/sessionRoutes.js";
    "./server/User.js" = "./server/utils/User.js";
}

foreach ($source in $serverMoves.Keys) {
    $destination = $serverMoves[$source];
    if (Test-Path $source) {
        Move-Item $source $destination -Force;
        Write-Host "Moved $source to $destination";
    } else {
        Write-Host "$source not found in server/";
    }
}

Write-Host "Reorganization complete.";
