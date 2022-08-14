interface DaDataRes {
  suggestions: DaDataItem[]
}

interface DaDataItem {
  value: string,
  unrestricted_value: string
  data: {
    inn: string
    kpp?: string
    ogrn: string
    okpo: string
    name: {
      full_with_opf: string
      short_with_opf: string
      full: string
      short: string
    }
    opf: {
      code: string
      full: string
      short: string
    }
    address: {
      value: string
      unrestricted_value: string
      data: {
        postal_code: string
        country: string
        city_fias_id: string
        "city_type": string
        "city_type_full": string
        "city": string
      }
    }
  }
}
