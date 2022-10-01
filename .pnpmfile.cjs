"use strict"

/**
 * When using the PNPM package manager, you can use pnpmfile.js to workaround
 * dependencies that have mistakes in their package.json file.  (This feature is
 * functionally similar to Yarn's "resolutions".)
 *
 * For details, see the PNPM documentation:
 * https://pnpm.js.org/docs/en/hooks.html
 *
 * IMPORTANT: SINCE THIS FILE CONTAINS EXECUTABLE CODE, MODIFYING IT IS LIKELY TO INVALIDATE
 * ANY CACHED DEPENDENCY ANALYSIS.  After any modification to pnpmfile.js, it's recommended to run
 * "rush update --full" so that PNPM will recalculate all version selections.
 * Or `pnpm install --fix-lockfile` for non Rush projects
 */
module.exports = {
  hooks: {
    readPackage,
  },
}

/**
 * This hook is invoked during installation before a package's dependencies
 * are selected.
 * The `packageJson` parameter is the deserialized package.json
 * contents for the package that is about to be installed.
 * The `context` parameter provides a log() function.
 * The return value is the updated object.
 */

const TYPES = {
  PEER: "peerDependencies",
  DEPS: "dependencies",
}

const prettyType = (type) => (type === TYPES.DEPS ? "dependency" : "peerDependency")

function readPackage(packageJson, context) {
  function removeGlobal(type, name, noLog) {
    if (packageJson[type] && packageJson[type][name]) {
      !noLog &&
        context.log(`Removed "${name}" ${prettyType(type)} for ${packageJson.name}`)
      delete packageJson[type][name]
    }
  }

  function changeGlobal(type, name, ver, noLog) {
    if (packageJson[type] && packageJson[type][name]) {
      const originalVersion = packageJson[type][name]
      if (originalVersion !== ver) {
        !noLog &&
          context.log(
            `Changed "${name}" ${prettyType(
              type,
            )} from ${originalVersion} to ${ver} for ${packageJson.name}`,
          )
        packageJson[type][name] = ver
      }
    }
  }

  function add(type, forPackage, dep, ver, noLog) {
    if (packageJson.name === forPackage) {
      if (!packageJson[type]) {
        packageJson[type] = {}
      }
      !noLog && context.log(`Added "${dep}" ${prettyType(type)} for ${packageJson.name}`)
      packageJson[type][dep] = ver
    }
  }

  function remove(type, forPackage, dep, noLog) {
    if (packageJson.name === forPackage && !packageJson?.[type]?.[dep]) {
      context.log(
        `No ${type} "${dep}" in the package ${forPackage} to remove it. You sure about it?`,
      )
    } else if (packageJson.name === forPackage) {
      !noLog && context.log(`Removed "${dep}" dependency for "${packageJson.name}"`)
      delete packageJson[type][dep]
    }
  }

  function change(type, forPackage, dep, ver, noLog) {
    if (packageJson.name === forPackage && packageJson[type]) {
      if (!packageJson[type][dep]) {
        context.log(
          `No such ${type} in the package ${forPackage} to change it. You sure about it?`,
        )
      } else if (packageJson.name === forPackage) {
        const originalVersion = packageJson[type][dep]
        if (originalVersion !== ver) {
          !noLog &&
            context.log(
              `Changed "${dep}" ${prettyType(
                type,
              )} from ${originalVersion} to ${ver} for ${packageJson.name}`,
            )
          packageJson[type][dep] = ver
        }
      }
    }
  }

  change(TYPES.PEER, "vitest-dom", "vitest", "<1", true)

  return packageJson
}
