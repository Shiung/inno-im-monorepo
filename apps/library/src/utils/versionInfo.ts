export default function versionInfo() {
  window._version_ = {
    name: process.env.name,
    version: process.env.version,
    commitHEAD: process.env.commitHEAD,
  }
}