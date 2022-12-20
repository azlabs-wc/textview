# Text Edit view

Text edit view is an utility web component that present application users with two distinct modes:

- preview mode which is an information presentation layer use by application developper to display information to user
- edit mode which allow application user to edit or interact with presented data using an HTML input element.

## Usage

```html
<script type="module">
  import '@azlabs-wc/text-view/azl-text-edit-view.js';
</script>

<azl-center>
  <azl-text-edit-view type="text" value="Customer name"> </azl-text-edit-view>
</azl-center>
```

For adavance use case, developpers can listen for change and submit events on the component.
Using `submit` event listener developper can get update data when user click on 'Enter' key. The component also provides developper with `change` event which fires on every change on the input element:

```html
<!DOCTYPE html>
<html lang="en-GB">
  <!-- ... -->
  <body>
    <!-- ... -->
    <script type="module">
      import { html, render } from 'lit';
      import '../dist/azl-text-edit-view.js';
      import '@azlabs-wc/layouts/azl-center.js';

      const onSubmitListener = e => {
        console.log('Submit Listener: ', e.data);
      };

      const onChangeListener = e => {
        console.log('Change Listener: ', e.data);
      };

      render(
        html`
          <azl-center>
            <azl-text-edit-view
              @change=${onChangeListener}
              @submit=${onSubmitListener}
              type="text"
              value="Customer name"
              placeholder="Placeholder"
            >
            </azl-text-edit-view>
          </azl-center>
        `,
        document.querySelector('#demo')
      );
    </script>
  </body>
</html>
```
