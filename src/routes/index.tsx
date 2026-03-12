import { component$ } from '@qwik.dev/core';
import { ChefHat, Github } from '../';

export default component$(() => {
  return (
    <>
      <h1>Lucide Icons</h1>
      <ChefHat size={56} />

      <h2>Deprecated Icon</h2>
      <Github size={56} />
    </>
  );
});
