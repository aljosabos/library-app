# Typography Component

This component wraps text in the app. In the DOM tree, it's represented as an element passed with the `variant` prop.

## Example

<Typography variant="h3">Heading 3</Typography>

This will be represented as:

<h3>Heading 3</h3>

## Props

- **`variant`**: Defines the HTML tag and specific styling. If not passed any, the default is `p`.
- **`className`** (optional): Allows you to apply additional styling to the element.
- **`as`**: Used to override html element of variant (but does not override styling).

### Example with `as` Prop

<Typography variant="h3" as="p">Heading as paragraph</Typography>

This will get the styling of the `h3` variant, but will be represented in the DOM as:

<p className = {... h3 variant styles}>Heading as paragraph</p>
