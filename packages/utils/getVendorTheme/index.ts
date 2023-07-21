const getVendorTheme = (VENDORID: string) => {
  switch (VENDORID) {
    case 'vd001':
    case 'vd004':
    case 'vd007':
    case 'vd009':
      return 'vd004'
    case 'vd002':
    case 'vd003':
    case 'vd006':
    case 'vd008':
      return 'vd002'
    default:
      return
  }
}

export default getVendorTheme