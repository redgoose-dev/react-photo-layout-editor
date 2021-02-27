/**
 * delay
 */
export function delay(delay: number = 1000): Promise<void>
{
  return new Promise(resolve => setTimeout(resolve, delay));
}
