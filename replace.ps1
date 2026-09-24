$content = Get-Content -Path "index.html" -Raw
$start = '<section id="projects" class="projects-section">'
$end = '<!-- SKILLS & TOOLS -->'
$pattern = '(?s)' + [regex]::Escape($start) + '.*?(?=' + [regex]::Escape($end) + ')'
$newContent = $content -replace $pattern, (Get-Content "new_portfolio.txt" -Raw)
Set-Content -Path "index.html" -Value $newContent -Encoding UTF8
