import { spawn } from 'child_process'

const reactHN = spawn('npm', ['run', 'start'], {
  cwd: '../../',
})

reactHN.stdout.pipe(process.stdout)
reactHN.stderr.pipe(process.stderr)