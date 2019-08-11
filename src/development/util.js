export function pickImages(count=3)
{
  const sampleImages = [
    'https://images.unsplash.com/photo-1561271657-fbad0db4caaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2292&q=60',
    'https://images.unsplash.com/photo-1561214380-cdcaa684cf52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1561187273-0d2494d76346?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60',
    'https://images.unsplash.com/photo-1561266569-ffd2ec021489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2234&q=60',
    'https://images.unsplash.com/photo-1561087867-203d3c5344d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=60',
    'https://images.unsplash.com/photo-1561148755-03553117df6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=60',
    'https://images.unsplash.com/photo-1561155654-20461b26ee4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=60',
    'https://images.unsplash.com/photo-1561084195-ee7372303a19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=60',
  ];
  let images = Object.assign([], sampleImages);
  let result = [];

  (function get() {
    if (count <= 0) return;
    result.push(images.splice(Math.floor(Math.random() * images.length), 1)[0]);
    count--;
    get();
    if (count >= 1) get();
  })();

  return result;
}