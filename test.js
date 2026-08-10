const https = require('https');
https.get('https://github.com/users/h4yme/contributions', {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const matches = [...data.matchAll(/<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g)];
        const totalMatch = data.match(/<h2[^>]*>\s*([\d,]+)\s*contributions/i);
        const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, '')) : 0;
        
        console.log('Total:', total);
        console.log('Found dates:', matches.length);
        
        const active = matches.filter(m => parseInt(m[2]) > 0);
        console.log('Active days:', active.length);
        
        // Print the first column (first week)
        console.log('First column dates:', matches.slice(0, 7).map(m => m[1] + ':' + m[2]));
        // Print the second column (second week)
        console.log('Second column dates:', matches.slice(7, 14).map(m => m[1] + ':' + m[2]));
    });
});
