<script lang="ts">
  import Input from '../input/Input.svelte';

  let {
    value = $bindable(''),
    debouncedValue = $bindable(''),
    debounceMs = 300,
    type = 'search',
    onDebounced,
    ...rest
  } = $props<{
    value?: string;
    debouncedValue?: string;
    debounceMs?: number;
    type?: string;
    onDebounced?: (value: string) => void;
    label?: string;
    hint?: string;
    error?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    autocomplete?: string;
    inputmode?:
      | 'text'
      | 'email'
      | 'tel'
      | 'url'
      | 'numeric'
      | 'decimal'
      | 'search';
  }>();

  let timer: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    const nextValue = value;

    if (debounceMs <= 0) {
      debouncedValue = nextValue;
      onDebounced?.(nextValue);
      return;
    }

    timer = setTimeout(() => {
      debouncedValue = nextValue;
      onDebounced?.(nextValue);
    }, debounceMs);

    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  });
</script>

<Input bind:value {type} inputmode="search" {...rest} />
