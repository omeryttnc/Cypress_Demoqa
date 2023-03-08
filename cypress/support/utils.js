import faker from 'faker'
import moment from "moment";


const generataFixture = () => {


    cy.writeFile('cypress/fixtures/fakeData.json', {

        firstName: `${faker.name.firstName()}`,
        lastName: `${faker.name.lastName()}`,
        email: `${faker.internet.email()}`,
        //  gender: `${faker.name.gender()}`,
        mobileNumber: `${faker.phone.phoneNumber('4891######')}`,//+48 91 463 61 70
        dateOfBirth: `${moment().format("DD MMM YYYY")}`,
        subject: `${faker.company.companyName()}`,
        address:`${faker.address.streetAddress()}`
    })
}


export default {
    generataFixture
}