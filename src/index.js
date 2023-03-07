import {
  intro,
  outro,
  text,
  select,
  confirm,
  multiselect
} from '@clack/prompts'
import colors from 'picocolors'
import { trytm } from '@bdsqqq/try'

import { COMMIT_TYPES } from './commit-types.js'
import { getChangedFiles, getStagedFiles, gitAdd, gitCommit } from './git.js'

intro(colors.inverse('Bienvenido al asistente de commits!'))

const [changedFiles, errorChangedFiles] = await trytm(getChangedFiles())
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles())

if (errorChangedFiles ?? errorStagedFiles) {
  outro(colors.red('Error: Comprueba que estás en un repositorio de git'))
  process.exit(1)
}

if (stagedFiles.length === 0 && changedFiles.length > 0) {
  const files = await multiselect({
    message: colors.cyan('Selecciona los archivos que quieres añadir:'),
    options: changedFiles.map(file => ({
      value: file,
      label: file
    }))
  })

  await gitAdd({ files })
}

const commitType = await select({
  message: colors.cyan('Selecciona el tipo de commit:'),
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(8, ' ')} . ${value.description}`
  }))
})

const commitMsg = await text({
  message: colors.cyan('Ingresa el mensaje del commit:')
})

const { emoji, release } = COMMIT_TYPES[commitType]

let breakingChange = false
if (release) {
  breakingChange = await confirm({
    initialValue: false,
    message: `${colors.cyan(
      '¿Tiene este commit cambios que rompen la compatibilidad anterior?'
    )}
    
    ${colors.gray(
      `Si la respuesta es sí, deberías crear un commit con el tipo ${colors.red(
        'BREAKING CHANGE'
      )} y al hacer realease se publicará una versión mayor.`
    )}`
  })
}

let commit = `${emoji} ${commitType}: ${commitMsg}`
commit = breakingChange ? `${commit} [BREAKING CHANGE]: ` : commit

const shouldCommit = await confirm({
  message: `${colors.cyan('¿Estás seguro de que quieres hacer el commit?')}
  
  ${colors.gray(colors.bold(commit))}
  `
})

if (!shouldCommit) {
  outro(
    colors.yellow('Gracias por usar el asistente, no se ha creado el commit.')
  )
  process.exit(0)
}

await gitCommit({ commit })

outro(
  colors.green('✔ Commit creado con éxito. ¡Gracias por usar el asistente!')
)
