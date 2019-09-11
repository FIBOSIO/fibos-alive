//-keepalive 模块
let http = require('http');
let fibos = require('fibos');
let o_start = fibos.start;

let run_command = '--keepalive';
let backup_url = "http://ghost.bp.fo";

let p, _params;

function check() {
    let argv = process.argv;
    if (!argv.includes(run_command)) return o_start();
    if (_params) {
        backup_url = _params.backup_url || backup_url;
    }

    process.on('SIGINT', () => {
        p.kill(2);
        process.exit();
    });

    process.on('SIGTERM', () => {
        p.kill(2);
        process.exit();
    });

    function restart() {
        let files = http.get(backup_url + "/data").json().files;
        files.sort((a, b) => {
            return parseInt(b.split("_")[1]) - parseInt(a.split("_")[1]);
        })

        let backup_file = files[0];
        if (backup_file.substring(0, 1) == '.') backup_file = backup_file.substring(1);

        let data_dir = fibos.data_dir;
        process.run('rm', ['-rf', data_dir]);
        console.log(`rm -rf ${data_dir}`);;

        process.run('wget', [backup_url + backup_file]);
        console.log(`wget file from ${backup_url + backup_file}`);
        let backup_files = backup_file.split('/')

        let backup_name = backup_files[backup_files.length - 1];
        process.run("tar", ["-zxvSf", backup_name]);
        console.log(`tar -zxvSf ${backup_name}`);

        let data_name = data_dir.split('/')[data_dir.split('/').length - 1];
        process.run('mv', ['data', data_name]);
        console.log(`mv data ${data_name}`);

        process.run('mv', ['./' + data_name, data_dir]);
        console.log(`mv ./${data_name} ${data_dir}`);

        process.run('rm', ['-f', backup_name]);
        console.log(`rm -f ${backup_name}`);
    }

    process.run('cd', [process.env.PWD]);
    if (['fibos'].includes(argv[0]) || argv[0] == process.execPath) argv.splice(0, 1);
    if (argv.includes(run_command)) argv.splice(argv.indexOf(run_command), 1);

    while (true) {
        p = process.start(process.execPath, argv);
        let ret = p.wait();
        if (![2, 15].includes(ret)) restart();
    }
}

fibos.start = check;
module.exports = params => {
    _params = params;
};