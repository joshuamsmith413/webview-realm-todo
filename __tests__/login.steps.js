import { defineFeature, loadFeature } from 'jest-cucumber';
import { WelcomeView } from '../views/WelcomeView';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';


const feature = loadFeature('__tests__/login.feature');

defineFeature(feature, test => {

    // const username = "foo"
    // const password = "bar";
    // let accessGranted = true
    // test('Enter username and password to login', ({given, when, then, and}) => {
    //     console.log(WelcomeView.props)
    //     given('I am already a user', () => {
    //         expect(username.length).toBeGreaterThan(2)
    //     }) 
        
    //     when('I enter my username', () => {
    //         accessGranted = username.length > 2
    //     })
        
    //     and('I enter my password', () => {
    //         accessGranted = password.length > 2
    //     })

    //     then('I should be logged in', () => {
    //         expect(accessGranted).toBe(true)
    //     })
    // })

    let realUseContext;
    let useContextMock;
    // Setup mock
    beforeEach(() => {
        realUseContext = React.useContext;
        useContextMock = React.useContext = jest.fn();
    });
    // Cleanup mock
    afterEach(() => {
        React.useContext = realUseContext;
    });
    
    test("auth hook works", () => {
        console.log(useContextMock)
        useContextMock.mockReturnValue("Test Value");
        const element = new ShallowRenderer().render(
            <WelcomeView />
        );
        console.log(element)
        // expect(element.props.children).toBe('Test Value');
    });
})

