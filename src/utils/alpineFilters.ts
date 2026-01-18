/**
 * Alpine.js reusable filter utilities
 * 
 * These utilities generate Alpine.js x-data objects for common filtering patterns
 */

/**
 * Creates a date-based visibility filter with optional max items limit
 * 
 * @param endDate - The end date to compare against (ISO format string)
 * @param currentIndex - The index of the current item in the list
 * @param maxItems - Optional maximum number of visible items to display
 * @returns Alpine.js x-data object as a string
 * 
 * @example
 * // In an Astro component:
 * import { dateVisibilityFilter } from "../../utils/alpineFilters";
 * 
 * items.map((item, index) => (
 *   <li x-data={dateVisibilityFilter(item.endDate, index, 5)} x-show="isVisible" x-transition>
 *     {item.content}
 *   </li>
 * ))
 */
export function dateVisibilityFilter(
  endDate: string,
  currentIndex: number,
  maxItems?: number
): string {
  const maxItemsLogic = maxItems
    ? `
                const visibleBefore = Array.from(this.$el.parentElement.children)
                  .slice(0, ${currentIndex})
                  .filter(el => window.getComputedStyle(el).display !== 'none').length;
                return visibleBefore < ${maxItems};
                `
    : "return true;";

  return `{
              get isVisible() {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const endDate = new Date('${endDate}');
                endDate.setHours(23, 59, 59, 999);
                const dateValid = endDate >= today;
                if (!dateValid) return false;
                ${maxItemsLogic}
              }
            }`;
}

/**
 * Creates a simple max items visibility filter
 * 
 * @param currentIndex - The index of the current item in the list
 * @param maxItems - Maximum number of visible items to display
 * @returns Alpine.js x-data object as a string
 * 
 * @example
 * items.map((item, index) => (
 *   <li x-data={maxItemsFilter(index, 3)} x-show="isVisible" x-transition>
 *     {item.content}
 *   </li>
 * ))
 */
export function maxItemsFilter(currentIndex: number, maxItems: number): string {
  return `{
              get isVisible() {
                const visibleBefore = Array.from(this.$el.parentElement.children)
                  .slice(0, ${currentIndex})
                  .filter(el => window.getComputedStyle(el).display !== 'none').length;
                return visibleBefore < ${maxItems};
              }
            }`;
}

/**
 * Creates a date range visibility filter (checks if current date is within range)
 * 
 * @param startDate - The start date of the valid range (ISO format)
 * @param endDate - The end date of the valid range (ISO format)
 * @returns Alpine.js x-data object as a string
 * 
 * @example
 * items.map(item => (
 *   <li x-data={dateRangeFilter(item.startDate, item.endDate)} x-show="isVisible" x-transition>
 *     {item.content}
 *   </li>
 * ))
 */
export function dateRangeFilter(startDate: string, endDate: string): string {
  return `{
              get isVisible() {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const start = new Date('${startDate}');
                start.setHours(0, 0, 0, 0);
                const end = new Date('${endDate}');
                end.setHours(23, 59, 59, 999);
                return today >= start && today <= end;
              }
            }`;
}
