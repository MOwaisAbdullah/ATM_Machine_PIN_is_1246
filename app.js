#! /usr/bin/env node
import inquirer from "inquirer";
const mypin = 1246;
let balance = 50000;
let cheq_price = 15;
let condition = true;
while (condition) {
    const answer = await inquirer.prompt([
        {
            name: 'pin',
            type: 'password',
            message: 'Enter Your Four Digit PIN:',
            mask: '*'
        }
    ]);
    if (answer.pin == mypin) {
        console.log("Correct PIN Entered...Login Sucessfully!!! \n\nWelcome To GIAIC ATM Machine\n");
        const operateAns = await inquirer.prompt([{
                name: 'options',
                type: 'list',
                message: 'Please Select An Option',
                choices: ['Cash Withdrawal', 'Balance Inquiry', 'Request Cheque Book', 'Funds Transfer']
            }]);
        if (operateAns.options === "Cash Withdrawal") {
            const cashdraw = await inquirer.prompt([{
                    name: 'cashOption',
                    type: 'list',
                    message: 'Please Select Withdrawal Type',
                    choices: ['Fast Cash', 'Other Amount',]
                }]);
            if (cashdraw.cashOption == "Fast Cash") {
                const amt = await inquirer.prompt([{
                        name: 'fast',
                        type: 'list',
                        message: 'Please Select Amount to Withdraw',
                        choices: ['500', '1000', '5000', '10000', '15000', '20000', '25000'],
                    }]);
                if (amt.fast > balance) {
                    console.log('Insufficient Balance');
                }
                else {
                    balance = balance -= amt.fast;
                }
                console.log("Your remaining account balance is " + `${balance}`);
            }
            if (cashdraw.cashOption === 'Other Amount') {
                const withdraw = await inquirer.prompt([{
                        name: 'withdrawAmount',
                        type: 'number',
                        message: 'Enter Your Amount in multiples of 500 and 1000:',
                    }]);
                if (withdraw.withdrawAmount > balance) {
                    console.log('Insufficient Balance');
                }
                else {
                    balance = balance -= withdraw.withdrawAmount;
                }
                console.log("Your remaining account balance is " + `${balance}`);
            }
        }
        if (operateAns.options === "Balance Inquiry") {
            console.log("Your remaining account balance is " + `${balance}`);
        }
        if (operateAns.options === "Request Cheque Book") {
            const chqbook = await inquirer.prompt([{
                    name: 'cheque',
                    type: 'list',
                    message: 'Select number of leaves for new cheque book:',
                    choices: ['10', '25', '50', '100']
                }]);
            let cheqBkAmt = chqbook.cheque * cheq_price;
            if (cheqBkAmt < balance) {
                balance -= cheqBkAmt;
                console.log('New cheque book applied successfully.\nYour remaining account balance is ' + `${balance}`);
            }
            else {
                console.log('Insufficient Balance in Account');
            }
        }
        if (operateAns.options === "Funds Transfer") {
            const fundTrans = await inquirer.prompt([{
                    name: 'ft',
                    type: 'list',
                    message: 'Please Select Bank Name For Funds Transfer',
                    choices: ['ABL', 'UBL', 'MCB', 'DUIB', 'BANKISLAMIC', 'FAYSAL', 'NBP', 'BAHL', 'HMB', 'MEEZAN', 'BOP', 'BOK', 'SONERI', 'HBL']
                }]);
            const FTAcct = await inquirer.prompt([{
                    name: 'ftacc',
                    type: 'input',
                    message: 'Please Enter Account Number or IBAN For Funds Transfer',
                }]);
            const FTAMT = await inquirer.prompt([{
                    name: 'ftamt',
                    type: 'input',
                    message: 'Please Enter Amount For Funds Transfer',
                }]);
            if (FTAMT.ftamt > balance) {
                console.log('Insufficient Balance');
            }
            else {
                balance = balance -= FTAMT.ftamt;
            }
            console.log("Your remaining account balance is " + `${balance}`);
        }
        const moretxn = await inquirer.prompt([{
                name: 'mtxn',
                type: 'confirm',
                message: 'Do you want to conduct another transaction?',
                default: 'false'
            }]);
        condition = moretxn.mtxn;
    }
    // MAIN if else part here............. 
    else {
        condition = false;
        console.log("Wrong PIN code entered....*** Session Terminated.***");
    }
}
