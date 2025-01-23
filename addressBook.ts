import * as readlineSync from "readline-sync";

interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  email: string;
}

class AddressBook {
  contacts: Contact[];

  constructor() {
    this.contacts = [];
  }

  addContacts(): void {
    console.log("\nAdd Multiple Contacts:");

    while (true) {
      console.log("\nEnter Contact Details:");
      const firstName: string = readlineSync.question("First Name: ");
      const lastName: string = readlineSync.question("Last Name: ");
      const address: string = readlineSync.question("Address: ");
      const city: string = readlineSync.question("City: ");
      const state: string = readlineSync.question("State: ");
      const zip: string = readlineSync.question("ZIP Code: ");
      const phoneNumber: string = readlineSync.question("Phone Number (10 digits): ");
      const email: string = readlineSync.question("Email: ");

      const contact: Contact = { firstName, lastName, address, city, state, zip, phoneNumber, email };

      this.contacts.push(contact);
      console.log("Contact added successfully!");

      const addAnother: string = readlineSync.question("Do you want to add another contact? (y/n): ");
      if (addAnother.toLowerCase() === "n") break;
    }
  }

  displayContacts(): void {
    if (this.contacts.length === 0) {
      console.log("No contacts available.");
    } else {
      console.log("\nContacts List:");
      for (let i = 0; i < this.contacts.length; i++) {
        const contact = this.contacts[i];
        console.log(
          `${i + 1}. ${contact.firstName} ${contact.lastName}, Address: ${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}, Phone: ${contact.phoneNumber}, Email: ${contact.email}`
        );
      }
    }
  }

  editContact(): void {
    const nameToSearch: string = readlineSync.question("\nEnter the first name of the contact you want to edit: ");

    const filteredContacts = this.contacts.filter(
      (c) => c.firstName.toLowerCase() === nameToSearch.toLowerCase()
    );

    if (filteredContacts.length > 0) {
      const contact = filteredContacts[0];
      console.log("\nEditing Contact:");
      contact.firstName = readlineSync.question(`First Name (${contact.firstName}): `, {
        defaultInput: contact.firstName,
      });
      contact.lastName = readlineSync.question(`Last Name (${contact.lastName}): `, {
        defaultInput: contact.lastName,
      });
      contact.address = readlineSync.question(`Address (${contact.address}): `, {
        defaultInput: contact.address,
      });
      contact.city = readlineSync.question(`City (${contact.city}): `, { defaultInput: contact.city });
      contact.state = readlineSync.question(`State (${contact.state}): `, { defaultInput: contact.state });
      contact.zip = readlineSync.question(`ZIP Code (${contact.zip}): `, { defaultInput: contact.zip });
      contact.phoneNumber = readlineSync.question(`Phone Number (${contact.phoneNumber}): `, {
        defaultInput: contact.phoneNumber,
      });
      contact.email = readlineSync.question(`Email (${contact.email}): `, { defaultInput: contact.email });
      console.log("Contact updated successfully!");
    } else {
      console.log("Contact not found.");
    }
  }

  deleteContact(): void {
    const nameToDelete: string = readlineSync.question("\nEnter the first name of the contact you want to delete: ");

    const initialLength = this.contacts.length;

    this.contacts = this.contacts.filter(
      (c) => c.firstName.toLowerCase() !== nameToDelete.toLowerCase()
    );

    if (this.contacts.length < initialLength) {
      console.log("Contact deleted successfully!");
    } else {
      console.log("Contact not found.");
    }
  }
}

class AddressBookSystem {
  addressBooks: Map<string, AddressBook>;

  constructor() {
    this.addressBooks = new Map<string, AddressBook>();
  }

  addAddressBook(): void {
    const name: string = readlineSync.question("\nEnter the name of the new address book: ");
    if (this.addressBooks.has(name)) {
      console.log("An address book with this name already exists.");
    } 
    else {
      this.addressBooks.set(name, new AddressBook());
      console.log(`Address book '${name}' created successfully!`);
    }
  }

  selectAddressBook(): AddressBook | null {
    const name: string = readlineSync.question("\nEnter the name of the address book to select: ");
    const addressBook = this.addressBooks.get(name);
  
    if (addressBook) {
      return addressBook;
    }
  
    console.log("Address book not found.");
    return null;
  }
  

  menu(): void {
    while (true) {
      console.log("\nAddress Book System Menu:");
      console.log("1. Add Address Book");
      console.log("2. Select Address Book");
      console.log("3. Exit");

      const choice: string = readlineSync.question("Enter your choice: ");

      switch (choice) {
        case "1":
          this.addAddressBook();
          break;
        case "2":
          const selectedBook = this.selectAddressBook();
          if (selectedBook) {
            this.addressBookMenu(selectedBook);
          }
          break;
        case "3":
          console.log("Exiting...");
          return;
        default:
          console.log("Invalid choice.");
      }
    }
  }

  addressBookMenu(addressBook: AddressBook): void {
    while (true) {
      console.log(`\nMenu for Address Book`);
      console.log("1. Add Contact");
      console.log("2. Display Contacts");
      console.log("3. Edit Contact");
      console.log("4. Delete Contact");
      console.log("5. Back to Main Menu");

      const choice: string = readlineSync.question("Enter your choice: ");

      switch (choice) {
        case "1":
          addressBook.addContacts();
          break;
        case "2":
          addressBook.displayContacts();
          break;
        case "3":
          addressBook.editContact();
          break;
        case "4":
          addressBook.deleteContact();
          break;
        case "5":
          return;
        default:
          console.log("Invalid choice.");
      }
    }
  }
}

const addressBookSystem = new AddressBookSystem();
addressBookSystem.menu();
