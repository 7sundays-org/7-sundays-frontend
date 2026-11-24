const REGISTERED_OFFICE = {
  street: "Via Bezzecca 1",
  postalCode: "20135",
  city: "Milano",
  province: "MI",
} as const;

/**
 * Details of the site owner, shared by the privacy policy (data controller)
 * and the structured data.
 */
export const COMPANY = {
  name: "7Sundays S.r.l.",
  registeredOffice: REGISTERED_OFFICE,
  address: `${REGISTERED_OFFICE.street}, ${REGISTERED_OFFICE.postalCode} ${REGISTERED_OFFICE.city} (${REGISTERED_OFFICE.province})`,
  vatNumber: "10505410968",
  email: "info@7sundays.it",
  phone: "+39 393 004 7956",
  socials: [
    "https://www.instagram.com/7sundays.it/",
    "https://www.tiktok.com/@7sundays",
  ],
} as const;
