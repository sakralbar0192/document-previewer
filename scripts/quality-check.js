#!/usr/bin/env node
/* eslint-disable no-console */

import { execSync } from 'child_process'

console.log('🔍 Running comprehensive quality checks...\n')

const checks = [
  { name: 'ESLint', command: 'bun run lint:check' },
  { name: 'Stylelint', command: 'bun run stylelint:check' },
  { name: 'TypeScript', command: 'bun run type-check' },
]

let failed = false

for (const check of checks) {
  try {
    console.log(`📋 Running ${check.name}...`)
    execSync(check.command, { stdio: 'inherit' })
    console.log(`✅ ${check.name} passed\n`)
  } catch {
    console.error(`❌ ${check.name} failed\n`)
    failed = true
  }
}

if (failed) {
  console.error('💥 Quality checks failed!')
  process.exit(1)
} else {
  console.log('🎉 All quality checks passed!')
}
