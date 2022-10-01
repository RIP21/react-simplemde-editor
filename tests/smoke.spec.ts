import { test as base } from "@playwright/test";
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures,
} from "@playwright-testing-library/test/fixture";

const test = base.extend<TestingLibraryFixtures>(fixtures);

const { expect } = test;

test("Tests UpdateUsingButtonWithAutofocus behavior", async ({ screen, within }) => {
  await screen.goto("http://localhost:3000");
  const container = await screen.findByTestId("autofocus-no-spellchecker");
  const editor = await within(container).findByRole("textbox");
  await editor.fill("hello");
  const state = within(container).getByTestId("state")
  const editorContainer = within(container).getByTestId("autofocus-no-spellchecker-editor")
  expect(within(editorContainer).getByText("hello")).toBeDefined();
  expect(within(state).getByText("hello")).toBeDefined();
  const buttonToChangeValue = within(container).getByText("Click me to update the textValue outside of the editor")
  await buttonToChangeValue.click()
  expect(within(editorContainer).getByText("Changing text by setting new state.")).toBeDefined();
  expect(within(state).getByText("Changing text by setting new state.")).toBeDefined();
});
