import {IItemBoxProps} from '../components/itemBox/ItemBox';
import {defaultMatchFilter} from './FilterUtils';

describe('FilterUtils', () => {
    describe('defaultMatchFilter', () => {
        const defaultItemBox: IItemBoxProps = {
            value: 'abc',
        };

        it('should return true if the filterValue is empty', () => {
            expect(defaultMatchFilter('', defaultItemBox)).toBe(true);
        });

        it('should not throw errors when the filterValue contains special characters', () => {
            expect(() => {
                defaultMatchFilter('(', defaultItemBox);
                defaultMatchFilter('/', defaultItemBox);
                defaultMatchFilter('\\', defaultItemBox);
                defaultMatchFilter('[', defaultItemBox);
            }).not.toThrow();
        });

        describe('with value', () => {
            it('should return true if the item value contain the filterValue', () => {
                expect(defaultMatchFilter('a', defaultItemBox)).toBe(true);
            });

            it('should return true if the item value contain a exact match with the filterValue', () => {
                expect(defaultMatchFilter(defaultItemBox.value, defaultItemBox)).toBe(true);
            });

            it('should return false if the item value do not contain the filterValue', () => {
                expect(defaultMatchFilter('d', defaultItemBox)).toBe(false);
            });
        });

        describe('with displayValue', () => {
            const itemBoxWithDisplayValue: IItemBoxProps = {
                displayValue: 'abc',
                value: 'z',
            };

            it('should return true if the item displayValue contain the filterValue', () => {
                expect(defaultMatchFilter('a', itemBoxWithDisplayValue)).toBe(true);
            });

            it('should return true if the item displayValue contain a exact match with the filterValue', () => {
                expect(
                    defaultMatchFilter(itemBoxWithDisplayValue.displayValue as string, itemBoxWithDisplayValue)
                ).toBe(true);
            });

            it('should return false if the item displayValue do not contain the filterValue', () => {
                expect(defaultMatchFilter('d', itemBoxWithDisplayValue)).toBe(false);
            });
        });
    });
});
