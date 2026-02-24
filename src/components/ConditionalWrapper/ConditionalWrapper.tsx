/**
 * A component that provides a conditional wrapping component
 *
 * @param condition - condition that decides wrapping.
 * @param wrapper - function that states what will you wrap with.
 * @param children - children that will come inside the conditional component.
 */
export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (child: React.ReactElement) => React.ReactElement;
  children: React.ReactElement;
}) => (condition ? wrapper(children) : children);
