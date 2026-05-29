export function settingsView() {
    return `
        <div class="p-6">
            <h1 class="text-headline-sm text-on-surface mb-2">Settings</h1>
            <p class="text-body-md text-on-surface-variant mb-6">Application configuration</p>
            <div class="bg-surface rounded-xl border border-outline-variant p-6">
                <div class="mb-6">
                    <label class="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" id="darkModeToggle" class="w-5 h-5">
                        <span class="text-body-md text-on-surface">Dark Mode</span>
                    </label>
                </div>
                <div class="mb-6">
                    <label class="block text-label-md text-on-surface-variant mb-2">Notifications</label>
                    <select class="w-full max-w-xs border border-outline-variant rounded-lg p-2 bg-surface">
                        <option>All</option>
                        <option>Only mentions</option>
                        <option>None</option>
                    </select>
                </div>
                <button class="px-4 py-2 bg-primary text-on-primary rounded-lg">Save Changes</button>
            </div>
        </div>
    `;
}