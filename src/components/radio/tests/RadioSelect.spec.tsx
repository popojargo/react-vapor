import {mount, ReactWrapper, shallow} from 'enzyme';
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import {TestUtils} from '../../../utils/TestUtils';
import {Radio} from '../Radio';
import {IRadioSelectProps, RadioSelect} from '../RadioSelect';

describe('RadioSelect', () => {
    describe('<RadioSelect />', () => {
        it('should render without errors', () => {
            expect(() => {
                shallow(
                    <RadioSelect />,
                );
            }).not.toThrow();
        });
    });

    describe('<RadioSelect />', () => {
        let radioSelect: ReactWrapper<IRadioSelectProps, any>;
        let innerRadios: ReactWrapper<any, any>;
        let clickSpy: jasmine.Spy;
        const aRadioValue = 'blue';
        const anotherRadioValue = 'red';
        const anotherName = 'Johnny the almighty magic chicken';

        const refreshWrapperWhenDone = TestUtils.buildRefreshFunction((reactWrapper) => {
            innerRadios = reactWrapper.find('Radio');
        });

        const findRadio = (value: string) => innerRadios.findWhere((radio) => radio.prop('value') === value).first();

        beforeEach(() => {
            clickSpy = jasmine.createSpy('onClick');
            radioSelect = mount(
                <RadioSelect>
                    <Radio id='radio1' value={aRadioValue} onClick={clickSpy} />
                    <Radio id='radio2' value={anotherRadioValue} name={anotherName} />
                </RadioSelect>,
                {attachTo: document.getElementById('App')},
            );
            refreshWrapperWhenDone(radioSelect);
        });

        afterEach(() => {
            radioSelect.unmount();
            radioSelect.detach();
        });

        it('should set value prop when specified', () => {
            expect(radioSelect.prop('value')).toBe(undefined);

            radioSelect.setProps({value: aRadioValue}).mount();
            expect(radioSelect.prop('value')).toBe(aRadioValue);
        });

        it('should disable children when disabled', () => {
            refreshWrapperWhenDone(radioSelect, () => radioSelect.setProps({disabled: false}));

            expect(findRadio(aRadioValue).prop('disabled')).toBe(false);
            expect(findRadio(anotherRadioValue).prop('disabled')).toBe(false);

            refreshWrapperWhenDone(radioSelect, () => radioSelect.setProps({disabled: true}));

            expect(findRadio(aRadioValue).prop('disabled')).toBe(true);
            expect(findRadio(anotherRadioValue).prop('disabled')).toBe(true);
        });

        it('should check children with same value', () => {
            refreshWrapperWhenDone(radioSelect, () => radioSelect.setProps({value: undefined}));

            expect(findRadio(aRadioValue).prop('checked')).toBe(false);
            expect(findRadio(anotherRadioValue).prop('checked')).toBe(false);

            refreshWrapperWhenDone(radioSelect, () => radioSelect.setProps({value: aRadioValue}));

            expect(findRadio(aRadioValue).prop('checked')).toBe(true);
            expect(findRadio(anotherRadioValue).prop('checked')).toBe(false);
        });

        it('should set children name prop with self name prop when children does not specify it', () => {
            const name = 'Maurice the nuclear trout 04';

            refreshWrapperWhenDone(radioSelect, () => radioSelect.setProps({name}));

            expect(findRadio(aRadioValue).prop('name')).toBe(name);
            expect(findRadio(anotherRadioValue).prop('name')).toBe(anotherName);
        });

        it('should chain prop onChange with children onClick prop and call both on children change', () => {
            const innerRadio = innerRadios.findWhere((radio) => radio.prop('value') === aRadioValue).first();
            const innerRadioInput = innerRadio.find('input').first();

            radioSelect.setProps({onChange: clickSpy}).mount();
            innerRadioInput.simulate('click');

            expect(clickSpy.calls.count()).toBe(2);
        });
    });
});
