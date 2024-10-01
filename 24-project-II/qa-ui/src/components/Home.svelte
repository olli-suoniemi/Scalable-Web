<script>
  import { onMount } from 'svelte';
  import CourseItem from '../components/CourseItem.svelte';

  let courses = [];

  // Fetch available courses from the API when the component mounts
  onMount(async () => {
    try {
      const response = await fetch('/api/courses', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      courses = await response.json();
      
    } catch (error) {
      console.error(error);
    }
  });
</script>

<h1 class="text-2xl font-bold mb-4">Available Courses</h1>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each courses as course (course.id)}
    <CourseItem course={course} />
  {/each}
</div>
