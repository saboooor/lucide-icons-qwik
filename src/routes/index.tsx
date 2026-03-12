import { component$ } from '@qwik.dev/core';
import { ChefHat } from '../../lib/index.qwik.mjs';

export default component$(() => {
  return (
    <>
      <h1>Lucide Icons</h1>
      <ChefHat size={56} />
    </>
  );
});
