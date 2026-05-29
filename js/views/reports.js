export function reportsView() {
    return `
        <div class="p-6">
            <h1 class="text-headline-sm text-on-surface mb-2">Reports</h1>
            <p class="text-body-md text-on-surface-variant mb-6">Analytics and team metrics</p>
            <div class="grid grid-cols-4 gap-4 mb-6">
                <div class="bg-surface-container-low rounded-xl p-4">
                    <div class="text-label-md text-on-surface-variant">Completed Tasks</div>
                    <div class="text-headline-md text-on-surface">47</div>
                </div>
                <div class="bg-surface-container-low rounded-xl p-4">
                    <div class="text-label-md text-on-surface-variant">In Progress</div>
                    <div class="text-headline-md text-on-surface">23</div>
                </div>
                <div class="bg-surface-container-low rounded-xl p-4">
                    <div class="text-label-md text-on-surface-variant">Active Members</div>
                    <div class="text-headline-md text-on-surface">8</div>
                </div>
                <div class="bg-surface-container-low rounded-xl p-4">
                    <div class="text-label-md text-on-surface-variant">Completion Rate</div>
                    <div class="text-headline-md text-on-surface">67%</div>
                </div>
            </div>
        </div>
    `;
}