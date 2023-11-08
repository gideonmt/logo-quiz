import adapter from '@sveltejs/adapter-static';

export default {
    kit: {
        // Your preferred adapter, such as adapter-static or adapter-node.
        // See SvelteKit documentation for more details on adapters.
        adapter: adapter({
            // Options for the adapter if needed.
            // For example, you can specify the output directory.
            // output: 'build'
        }),
        // Other configuration options for your project
    },
};
