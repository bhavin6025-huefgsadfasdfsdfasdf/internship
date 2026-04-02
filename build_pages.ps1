$routes = @{
  "super-admin" = @("analytics", "api-keys", "billing", "settings", "users", "system-health", "roles-permissions");
  "admin" = @("analytics", "billing", "departments", "integrations", "leaves", "payroll", "reports", "settings", "users", "recruitment");
  "manager" = @("approvals", "attendance", "analytics", "my-team", "performance", "reports", "settings", "shifts", "training");
  "employee" = @("apps", "benefits", "career", "directory", "documents", "help", "my-attendance", "payslips", "time-off", "training", "goals")
}

$baseDir = "c:\Users\stadmin\Downloads\intenrship project 2\src\app"

foreach ($role in $routes.Keys) {
  foreach ($page in $routes[$role]) {
    $dir = Join-Path $baseDir -ChildPath "$role\$page"
    $file = Join-Path $dir -ChildPath "page.tsx"
    
    if (-not (Test-Path $dir)) {
      New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    
    if (-not (Test-Path $file)) {
      $name = (Get-Culture).TextInfo.ToTitleCase($page.Replace('-', ' '))
      $compName = $name.Replace(' ', '')
      
      $content = @"
'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

export default function $($compName)Page() {
  return (
    <>
      <Navbar title="$name" />
      <div className="content-area">
        <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-main)' }}>$name Module</h2>
            <p>This module is currently under development.</p>
          </div>
        </div>
      </div>
    </>
  );
}
"@
      Set-Content -Path $file -Value $content -Encoding UTF8
      Write-Host "Created $file"
    } else {
      Write-Host "Skipped $file"
    }
  }
}
