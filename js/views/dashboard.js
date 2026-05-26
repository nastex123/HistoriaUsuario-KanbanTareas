// js/views/dashboard.js
export function dashboardView() {
  return `
    <div class="flex gap-gutter h-full">
      <!-- Columna: To Do -->
      <div class="kanban-column flex flex-col w-1/4 h-full">
        <div class="flex items-center justify-between mb-md">
          <div class="flex items-center gap-2">
            <h3 class="font-title-sm text-title-sm text-on-surface">To Do</h3>
            <span class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">3</span>
          </div>
          <button class="material-symbols-outlined text-outline" data-icon="more_horiz">more_horiz</button>
        </div>
        <div class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar">
          <!-- Card 1 -->
          <div class="task-card bg-surface border border-outline-variant rounded-xl p-md shadow-sm">
            <div class="flex items-start justify-between mb-xs">
              <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">Design</span>
              <span class="material-symbols-outlined text-outline text-sm" data-icon="attach_file">attach_file</span>
            </div>
            <h4 class="font-label-md text-label-md text-on-surface mb-xs">User Flow Mapping</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Define the end-to-end journey for the new onboarding experience.</p>
            <div class="mt-md flex items-center justify-between">
              <div class="flex -space-x-2">
                <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBuiKEYj12lJcVG4nXyKu-Ai-H1-QlxIX2zT1jzk7AAD9j-20g91vBWIy1_5PsuU1H-g9vErAWuJJg3lohFPbVJhWG1ZwwSI2BxdTBpANzBluRwLzmBbnpSae8GQTTdZ1GoRzw9ZDPsxzDwyvkzduAyTDl3TN4KqDP45-VjqA0fxNIy5VVE5a8OP1OTlymungwOO-QcyUBGbbs24dxy1hwAoNbSe-uapYTlmCQYk70fcbq2y5m0xQhtlAZFbH8AX739jEY5b-ZtW8N" />
                <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMFhGwIRXSErcBCGHhCTzONc4V-aoXHbv3Bb0B7dMDwdGg3l25NTGZPNNlR82495ZLlhoi8IeMK0KPTuUrW88WE7s9j4EjcACUuB1g9sMjzjzkA9d7d81MuI0BQVZ3f1MpwplOXAbgD-_05LuexKrb1IwB3CVez6mpSbokMun24DLw7J4vebSUjPGu_Mwr4seNi9hsnr18iFZyzGmBUVQSd0m0C5xALrKW1O7O40Y3IEQ2eam3eWIY49HC4UoA7twGHVoe7FruTJIX" />
              </div>
              <span class="font-label-sm text-label-sm text-outline flex items-center gap-1">
                <span class="material-symbols-outlined text-sm" data-icon="schedule">schedule</span>2d
              </span>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="task-card bg-surface border border-outline-variant rounded-xl p-md shadow-sm">
            <div class="flex items-start justify-between mb-xs">
              <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">Marketing</span>
            </div>
            <h4 class="font-label-md text-label-md text-on-surface mb-xs">Social Media Assets</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Prepare Q3 promotional graphics for LinkedIn and Twitter.</p>
            <div class="mt-md flex items-center justify-between">
              <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8_17Xd9poBFvBCwXx25-JDPMSaFQNMUYLnyIhJkS_7NrlsW0MG9R2vorE3CfNKMkE4oX4L6dopgc_F9_Mj5ieYPiBlGxLCK7vM7uFvfyHpx3ptCHdVbdU7CMDBms9ZPGXFfahQnM9P9g9yXvOtdU1ggtRwk5DPOV-sVnlAxxRUtrtEM23JonEusSqFOP1BU6Xt0wVnfWMpW6XxnekjrGmBQ0Qz4NJO8ogLugD809Cxp7wA4UIkAEYeZWpAJr8ZcVWbd46c9Rh1GI3" />
              <span class="font-label-sm text-label-sm text-outline flex items-center gap-1">
                <span class="material-symbols-outlined text-sm" data-icon="schedule">schedule</span>5d
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna: In Progress -->
      <div class="kanban-column flex flex-col w-1/4 h-full">
        <div class="flex items-center justify-between mb-md">
          <div class="flex items-center gap-2">
            <h3 class="font-title-sm text-title-sm text-on-surface">In Progress</h3>
            <span class="bg-primary-container text-on-primary px-2 py-0.5 rounded-full font-label-sm text-label-sm">2</span>
          </div>
          <button class="material-symbols-outlined text-outline" data-icon="more_horiz">more_horiz</button>
        </div>
        <div class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar">
          <!-- Card 3 -->
          <div class="task-card bg-surface border-l-4 border-l-primary border border-outline-variant rounded-xl p-md shadow-sm">
            <div class="flex items-start justify-between mb-xs">
              <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">Engineering</span>
              <span class="material-symbols-outlined text-primary text-sm" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1">star</span>
            </div>
            <h4 class="font-label-md text-label-md text-on-surface mb-xs">API Documentation</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Updating the public API docs for the v2.4 release next week.</p>
            <div class="mt-md flex items-center justify-between">
              <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG8Jxa-wc0IqXzwH5Eb-olQWjFfMH6FQefHNg8x204_qA5sVV-TBUkIl8wK1XSgpI1pH94oGq5yB9UyZeJy-d3z2R12xUy54PTHs5JoHE30eaqCX5BeKws1PCMN0TntyKW0UPojlBnG1xGY4-UQTrCOIhR7cF_zb7rj-vnemMaZQM9Xzk-F73_Q6MYD0msF1j-Tkjyrn2XQvujydcVmhnZnMOGv6P1Ep9OaJYUghQE93UdvLGAJptOXzhk3FK3LGn988gRhSTXAiBu" />
              <span class="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-sm" data-icon="hourglass_empty">hourglass_empty</span>Today
              </span>
            </div>
          </div>
          <!-- Card 4 -->
          <div class="task-card bg-surface border-l-4 border-l-primary border border-outline-variant rounded-xl p-md shadow-sm">
            <div class="flex items-start justify-between mb-xs">
              <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">Research</span>
            </div>
            <h4 class="font-label-md text-label-md text-on-surface mb-xs">Competitor Analysis</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Reviewing the workflow engines of Top 3 competitors.</p>
            <div class="mt-md flex items-center justify-between">
              <div class="flex -space-x-2">
                <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7eH2yKXhhilnQPSAOyYdRKaopgFMREF6HtX_HIwjq3xuZYm4ZKlfDScpoBQBZsx-IENtU6uQN2QYZ5NzpSJdRhBWtM8idDAOE-D4wRHS3sJHELvQyup3Rwd4WCNdJfNdOIqOGt5vYPK7Cr7HEToZLcjqgNcc_5rtPehgWnAAhwJZCgu6GuBlzBfIP3C3x7jfnHLDxqDxfaYiNb5DZxXt-ZYDO1HGYbCGbuaBRxwF44-BzDTjoYv5kPRqHchlMqBPoWVE_WDsiZ-cF" />
              </div>
              <span class="font-label-sm text-label-sm text-outline flex items-center gap-1">
                <span class="material-symbols-outlined text-sm" data-icon="schedule">schedule</span>3d
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna: In Review -->
      <div class="kanban-column flex flex-col w-1/4 h-full">
        <div class="flex items-center justify-between mb-md">
          <div class="flex items-center gap-2">
            <h3 class="font-title-sm text-title-sm text-on-surface">In Review</h3>
            <span class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">2</span>
          </div>
          <button class="material-symbols-outlined text-outline" data-icon="more_horiz">more_horiz</button>
        </div>
        <div class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar">
          <!-- Card 5 -->
          <div class="task-card bg-surface border border-outline-variant rounded-xl p-md shadow-sm">
            <div class="flex items-start justify-between mb-xs">
              <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">Product</span>
            </div>
            <h4 class="font-label-md text-label-md text-on-surface mb-xs">Pricing Tier Update</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Final sign-off required for the Enterprise plan structural changes.</p>
            <div class="mt-md flex items-center justify-between">
              <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Vu2ZnV9zSVRIelpzQ9amly66nlIkf_hJZwjhj7loegVGyfEHMFSWOJd7a4ftY1xvKEUKql_RlDEhIorY3iEExKQ3oyKA6tsjkbHDqFMtJcFqJKgAbe0alXefStzQsQXrgpEHlRCrRYRcaEgYnuhw4x4MpYTN0A3-5dhUwPK16VDXdrVBrG7Wdy0cvHSlsKrhsEhrzV6e7CZmwIlerakMp9mXRiGpyBPZffa2tSwPBwXkfTGgOV7GWkUlE5EWX5I6U2-iyX2oE9VH" />
              <button class="review-btn text-primary font-label-sm text-label-sm hover:underline">Review now</button>
            </div>
          </div>
          <!-- Card 6 -->
          <div class="task-card bg-surface border border-outline-variant rounded-xl p-md shadow-sm">
            <div class="flex items-start justify-between mb-xs">
              <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">Legal</span>
            </div>
            <h4 class="font-label-md text-label-md text-on-surface mb-xs">Privacy Policy v2</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Review GDPR compliance updates for the European expansion.</p>
            <div class="mt-md flex items-center justify-between">
              <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGSSdRK1R6AXE2O721EMKE-E8qhG9Yf0cqcjox3fzqvhHptEsgbc5U_1p8Nbb8BF40pgMgjd3DGMC39nqfG1Q9vVj7iPakaCPZPjQp05roCHZuoW56ZlrTGeuMciF15t3ZSVjpMv-XNUN9nDIUGvIALpnpIc8Y3ptxhTAH808CamDabyPMndEsD5e28Nmi7l82hszFsc0B2l2RBRuyBuCbV7ewSDAs2gFIJpQmDjFeG0ukOEaUDio8ZLbkO1R6sdpQTH0OBZGzdb08" />
              <span class="font-label-sm text-label-sm text-outline">Waiting...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna: Done -->
      <div class="kanban-column flex flex-col w-1/4 h-full">
        <div class="flex items-center justify-between mb-md">
          <div class="flex items-center gap-2">
            <h3 class="font-title-sm text-title-sm text-on-surface">Done</h3>
            <span class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-label-sm text-label-sm">2</span>
          </div>
          <button class="material-symbols-outlined text-outline" data-icon="more_horiz">more_horiz</button>
        </div>
        <div class="flex-1 space-y-md p-2 bg-surface-container-low/50 rounded-xl overflow-y-auto custom-scrollbar">
          <!-- Card 7 -->
          <div class="task-card bg-surface/60 border border-outline-variant rounded-xl p-md shadow-sm opacity-80">
            <div class="flex items-start justify-between mb-xs">
              <span class="bg-secondary-container text-secondary px-2 py-0.5 rounded-full font-label-sm text-label-sm">Ops</span>
              <span class="material-symbols-outlined text-tertiary-container text-sm" data-icon="check_circle" data-weight="fill" style="font-variation-settings: 'FILL' 1">check_circle</span>
            </div>
            <h4 class="font-label-md text-label-md text-on-surface mb-xs line-through">Workspace Setup</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Configured the new Riwiflow cloud environment for the dev team.</p>
            <div class="mt-md flex items-center justify-between">
              <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgjRL3m9DHF3YGZ9L7qA_RcRJPl4umqaWvmn8arqMVJ62uiqUkJLSwHe5p-eaqCLo2yZSC4LVLo0cbslDO3gcIK6PqLe382tdnXjbBpDC6FkUXpP3XZlkU75S0wbUMtAOqn4xdMtT87viPtxakZDhZJB8YUFPAaxX0mnjg8Z_qUthkBqjcZGc0U4-VBiMlJlnbXt_YH2yhQtZBeACrGwzPWtArKfQMb4xchwCfOiP7UGAO2E4ImwtikNOs-_QPmx-LM1ef1p5cMHam" />
              <span class="font-label-sm text-label-sm text-outline">Completed</span>
            </div>
          </div>
          <!-- Card 8 -->
          <div class="task-card bg-surface/60 border border-outline-variant rounded-xl p-md shadow-sm opacity-80">
            <div class="flex items-start justify-between mb-xs">
              <span class="bg-secondary-container text-secondary px-2 py-0.5 rounded-full font-label-sm text-label-sm">Design</span>
              <span class="material-symbols-outlined text-tertiary-container text-sm" data-icon="check_circle" data-weight="fill" style="font-variation-settings: 'FILL' 1">check_circle</span>
            </div>
            <h4 class="font-label-md text-label-md text-on-surface mb-xs line-through">Style Guide v1</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Baseline UI tokens and shared components library established.</p>
            <div class="mt-md flex items-center justify-between">
              <img class="w-6 h-6 rounded-full border-2 border-surface" data-alt="Minimalist avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9K3iICaEVBTkkpFrk5gFPif69E0AZFc3In0EB7uTQ2WeGftb-aoQyDUz0GlqvjL5CkxmQUnV3i_1sjr8H1wuPvSMFK6y25CjVwQj8KcnK1qkDyBqNpoWoXkaNrrmrm5zFeUP-6QY-6fuxl00FMZaVOQRETlk_p_C3LgURT1C7i4vRjlqU3B04yeqJnQyCQlPxjMKylTXCxXq0q5nNwKDD8qEzY6SC1bnyhBvNeZgcskP5LdtbbSH2Q2BYan9OlgL0W-J2uuCwGuvO" />
              <span class="font-label-sm text-label-sm text-outline">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}