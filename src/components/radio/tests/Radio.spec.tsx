import {mount, ReactWrapper, shallow} from 'enzyme';
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import {TestUtils} from '../../../utils/TestUtils';
import {IInputProps} from '../../input/Input';
import {Radio} from '../Radio';

describe('Radio', () => {
    const anId = 'patate';

    describe('<Radio />', () => {
        it('should render without errors', () => {
            expect(() => {
                shallow(
                    <Radio id={anId} />,
                );
            }).not.toThrow();
        });
    });

    describe('<Radio />', () => {
        let radio: ReactWrapper<IInputProps, any>;
        let innerInput: ReactWrapper<any, any>;

        const refreshWrapperWhenDone = TestUtils.buildRefreshFunction((reactWrapper) => {
            innerInput = reactWrapper.find('input').first();
        });

        beforeEach(() => {
            radio = mount(
                <Radio id={anId} />,
                {attachTo: document.getElementById('App')},
            );
            refreshWrapperWhenDone(radio);
        });

        afterEach(() => {
            radio.unmount();
            radio.detach();
        });

        it('should set id prop', () => {
            expect(innerInput.prop('id')).toBe(anId);
        });

        it('should set name prop when specified', () => {
            const name = 'salut';
            expect(innerInput.prop('name')).toBe(undefined);

            refreshWrapperWhenDone(radio, () => radio.setProps({name}));
            expect(innerInput.prop('name')).toBe(name);
        });

        it('should set value prop when specified', () => {
            const value = 'blueberry';
            expect(radio.prop('value')).toBe(undefined);

            refreshWrapperWhenDone(radio, () => radio.setProps({value}));
            expect(radio.prop('value')).toBe(value);
        });

        it('should set not disable inner input when disabled prop is not specified', () => {
            expect(innerInput.prop('disabled')).toBe(false);
        });

        it('should set not check inner input when checked prop is not specified', () => {
            expect(innerInput.prop('checked')).toBe(false);
        });

        it('should set disabled prop when specified', () => {
            refreshWrapperWhenDone(radio, () => radio.setProps({disabled: false}));
            expect(innerInput.prop('disabled')).toBe(false);

            refreshWrapperWhenDone(radio, () => radio.setProps({disabled: true}));
            expect(innerInput.prop('disabled')).toBe(true);
        });

        it('should set checked prop when specified', () => {
            refreshWrapperWhenDone(radio, () => radio.setProps({checked: false}));
            expect(innerInput.prop('checked')).toBe(false);

            refreshWrapperWhenDone(radio, () => radio.setProps({checked: true}));
            expect(innerInput.prop('checked')).toBe(true);
        });

        it('should set classes when specified', () => {
            const innerClass = 'salut';
            const classes = [innerClass];
            expect(radio.find('div').hasClass(innerClass)).toBe(false);

            radio.setProps({classes});
            radio.update();
            expect(radio.find('div').hasClass(innerClass)).toBe(true);
        });

        it('should call prop onChange when specified on click', () => {
            const changeSpy = jasmine.createSpy('onChange');

            refreshWrapperWhenDone(radio, () => radio.setProps({onChange: changeSpy}));
            innerInput.simulate('change');

            expect(changeSpy.calls.count()).toBe(1);
        });
    });
});
