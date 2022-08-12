interface DaDataRes {
  suggestions: DaDataItem[]
}

interface DaDataItem {
  value: string,
  data: {
    inn: string
    kpp?: string
    ogrn: string
    okpo: string
  }
}
