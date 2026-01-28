# Vercel Speed Insights Integration Guide

This document explains how Vercel Speed Insights has been integrated into the Note Backend API.

## What is Vercel Speed Insights?

Vercel Speed Insights is a performance monitoring tool that tracks Core Web Vitals and other performance metrics for your web applications. It provides real-time insights into how your application performs for actual users.

## Implementation Details

### 1. Package Installation

The `@vercel/speed-insights` package has been added to the project dependencies in `package.json`:

```json
"dependencies": {
  "@vercel/speed-insights": "^1.0.0",
  ...
}
```

### 2. HTML Integration

A demonstration HTML page has been created at `public/index.html` that includes the Speed Insights tracking script. This page is served at the root route (`/`) of the application.

The Speed Insights script is integrated using the HTML implementation method:

```html
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

### 3. Express Server Configuration

The Express server (`server.js`) has been updated to:
- Serve static files from the `public` directory
- Serve the HTML page with Speed Insights integration at the root route

### 4. Vercel Configuration

A `vercel.json` file has been created to ensure proper deployment on Vercel:
- Configures the Node.js build
- Sets up routing for the Express application
- Ensures the Speed Insights routes are accessible

## How to Use

### Enabling Speed Insights on Vercel

1. **Deploy to Vercel**: Deploy this application to Vercel using the Vercel CLI or by connecting your Git repository:
   ```bash
   vercel deploy
   ```

2. **Enable Speed Insights in Dashboard**:
   - Go to your Vercel dashboard
   - Select your project
   - Navigate to the **Speed Insights** tab
   - Click **Enable**

3. **Verify Installation**:
   - After deployment, visit your deployed URL
   - Open browser DevTools and check the Network tab
   - You should see a request to `/_vercel/speed-insights/script.js`

4. **View Metrics**:
   - After users visit your site, return to the Speed Insights tab in your dashboard
   - View performance metrics, Core Web Vitals, and user analytics

## Important Notes

### Backend API Context

This is primarily a backend Express.js API. Speed Insights is designed for frontend applications and tracks client-side performance metrics. The integration provides:

1. **Demonstration**: Shows how Speed Insights works when users visit the root URL
2. **Documentation**: Provides a landing page explaining the API and its capabilities
3. **Future-Proofing**: If you add more frontend components or pages, Speed Insights will automatically track them

### API Endpoints

The existing API endpoints remain unchanged:
- `POST /note/*` - Authentication and note management endpoints
- The Speed Insights integration does not affect API functionality

### For Frontend Integration

If you build a separate frontend application that consumes this API, you should integrate Speed Insights directly in that frontend using the appropriate framework-specific package:

- **Next.js**: `@vercel/speed-insights/next`
- **React**: `@vercel/speed-insights/react`
- **Vue**: `@vercel/speed-insights/vue`
- **Svelte**: `@vercel/speed-insights/sveltekit`

## Additional Resources

- [Vercel Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Speed Insights Package Reference](https://vercel.com/docs/speed-insights/package)
- [Understanding Core Web Vitals](https://vercel.com/docs/speed-insights/metrics)
- [Privacy and Compliance](https://vercel.com/docs/speed-insights/privacy-policy)

## Testing Locally

To test the implementation locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Visit `http://localhost:5000` in your browser

**Note**: The Speed Insights script (`/_vercel/speed-insights/script.js`) will only be available when deployed to Vercel. Locally, the script will fail to load, but the page will still function normally.

## Troubleshooting

### Speed Insights script not loading

- Ensure Speed Insights is enabled in your Vercel dashboard
- Verify the deployment was successful
- Check that the `/_vercel/speed-insights/script.js` route is accessible

### No data appearing in dashboard

- Allow 24-48 hours for data to begin appearing
- Ensure users are actually visiting your deployed site
- Check that JavaScript is enabled in visitors' browsers
- Verify the Speed Insights script is loading without errors

### Build or deployment issues

- Ensure all dependencies are installed: `npm install`
- Verify `vercel.json` is properly configured
- Check Vercel deployment logs for any errors

## Next Steps

1. Deploy the application to Vercel
2. Enable Speed Insights in your project dashboard
3. Monitor performance metrics as users visit your site
4. Use insights to optimize your application's performance

For questions or issues, refer to the [Vercel Speed Insights documentation](https://vercel.com/docs/speed-insights) or contact Vercel support.
