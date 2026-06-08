# HTML 2: Forms, Inputs, and User Interaction

Forms are how websites collect information from users. Whether it's a login form, a search bar, or a checkout page, forms are everywhere. Let's break down every major form element and learn how to build interactive forms.

## The `<form>` Element

The `<form>` element wraps all form inputs and defines how data is sent.

```html
<form action="/submit" method="POST">
    <!-- form inputs go here -->
</form>
```

- `action` — The URL where the form data is sent when submitted.
- `method` — The HTTP method used. `GET` appends data to the URL, `POST` sends it in the request body.

## Text Inputs

The most common input type is `text`. It creates a single-line text field.

```html
<label for="username">Username:</label>
<input type="text" id="username" name="username" placeholder="Enter your username">
```

Always pair `<input>` with a `<label>`. Labels improve accessibility and make forms usable for everyone.

## Email and Password Inputs

Specialized input types give users a better experience and help browsers validate data.

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="you@example.com" required>

<label for="password">Password:</label>
<input type="password" id="password" name="password" minlength="8" required>
```

The `required` attribute prevents the form from being submitted if the field is empty. The browser will show an error message automatically.

## Checkboxes and Radio Buttons

Checkboxes let users select multiple options. Radio buttons let users pick one from a group.

```html
<!-- Checkboxes -->
<input type="checkbox" id="newsletter" name="newsletter">
<label for="newsletter">Subscribe to newsletter</label>

<!-- Radio buttons -->
<input type="radio" id="plan-free" name="plan" value="free">
<label for="plan-free">Free Plan</label>

<input type="radio" id="plan-pro" name="plan" value="pro">
<label for="plan-pro">Pro Plan</label>
```

Radio buttons with the same `name` attribute are grouped — only one can be selected at a time.

## Dropdown Menus

The `<select>` element creates a dropdown menu. Each option goes inside an `<option>` tag.

```html
<label for="country">Country:</label>
<select id="country" name="country">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
</select>
```

## Multi-Line Text

For longer text input, use `<textarea>` instead of `<input>`. It supports multiple lines.

```html
<label for="message">Message:</label>
<textarea id="message" name="message" rows="4" cols="50" placeholder="Write your message here..."></textarea>
```

## The Submit Button

Every form needs a way to send data. The `submit` button triggers the form submission.

```html
<button type="submit">Send Message</button>
```

You can also use `<input type="submit">` for the same result.

## Putting It All Together

Here's a complete contact form using everything we've learned.

```html
<form action="/contact" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="subject">Subject:</label>
    <select id="subject" name="subject">
        <option value="general">General Inquiry</option>
        <option value="support">Support</option>
        <option value="feedback">Feedback</option>
    </select>

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>

    <button type="submit">Send</button>
</form>
```

> 💡 **Tip:** Always use `<label>` elements with your inputs. Connect them using the `for` attribute (which matches the input's `id`). This makes your forms accessible and clickable — users can click the label to focus the input.
