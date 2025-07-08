document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const vehicleOptions = document.querySelectorAll(".vehicle-option");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const steps = document.querySelectorAll(".form-step");
  const serviceCards = document.querySelectorAll(".service-card");
  const selectButtons = document.querySelectorAll(".select-btn");
  const collectionContainer = document.getElementById("collectionContainer");
  const deliveryContainer = document.getElementById("deliveryContainer");
  let currentStep = 0;
  let collectionCounter = document.querySelectorAll(
    "#collectionContainer .collection-form"
  ).length;

  let deliveryCounter = document.querySelectorAll(
    "#deliveryContainer .collection-form"
  ).length;
  
  // Global shared counter for all destinations (collection + delivery)
  let globalDestinationCounter = 1;
  
  function updateCounters() {
    collectionCounter = document.querySelectorAll(
      "#collectionContainer .collection-form"
    ).length;
    deliveryCounter = document.querySelectorAll(
      "#deliveryContainer .collection-form"
    ).length;
  }
  
  // Function to get the next global destination number
  function getNextGlobalDestinationNumber() {
    globalDestinationCounter++;
    return globalDestinationCounter;
  }
  
  // Function to reset global counter (called when switching services)
  function resetGlobalDestinationCounter() {
    globalDestinationCounter = 1;
  }

  // Initialize Bootstrap components
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: "hover focus",
    });
  });

  // Function to check if device is mobile
function isMobile() {
    return window.innerWidth <= 768; // Bootstrap's md breakpoint
}

// Function to scroll to bottom of page
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

  serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            if (isMobile()) {
                // Small delay to ensure any other animations/changes complete first
                setTimeout(() => {
                    scrollToBottom();
                }, 100);
            }
        });
    });

  // Initialize Sortable for drag and drop
  if (collectionContainer) {
    new Sortable(collectionContainer, {
      handle: ".drag-handle",
      animation: 150,
      ghostClass: "sortable-ghost",
      onStart: function (evt) {
        evt.item.classList.add("dragging");
      },
      onEnd: function (evt) {
        evt.item.classList.remove("dragging");
      },
    });
  }
//test
  if (deliveryContainer) {
    new Sortable(deliveryContainer, {
      handle: ".drag-handle",
      animation: 150,
      ghostClass: "sortable-ghost",
      onStart: function (evt) {
        evt.item.classList.add("dragging");
      },
      onEnd: function (evt) {
        evt.item.classList.remove("dragging");
      },
    });
  }

  // Collapse functionality
  function setupCollapse() {
    document.querySelectorAll(".collapse-icon").forEach((button) => {
      button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-bs-target");
        const target = document.querySelector(targetId);

        if (!target) return;

        // Update aria-expanded attribute
        const isCurrentlyExpanded =
          this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isCurrentlyExpanded);

        // Toggle collapse using Bootstrap's collapse method
        bootstrap.Collapse.getOrCreateInstance(target).toggle();

        // Toggle the icon based on the new expanded state
        const icon = this.querySelector("i");
        if (icon) {
          if (isCurrentlyExpanded) {
            icon.classList.remove("bi-chevron-down");
            icon.classList.add("bi-chevron-up");
          } else {
            icon.classList.remove("bi-chevron-up");
            icon.classList.add("bi-chevron-down");
          }
        }
      });

      // Set initial icon state
      const targetId = button.getAttribute("data-bs-target");
      const target = document.querySelector(targetId);
      if (target) {
        const isExpanded = target.classList.contains("show");
        button.setAttribute("aria-expanded", isExpanded);
        const icon = button.querySelector("i");
        if (icon) {
          icon.classList.remove(
            isExpanded ? "bi-chevron-up" : "bi-chevron-down"
          );
          icon.classList.add(isExpanded ? "bi-chevron-down" : "bi-chevron-up");
        }
      }
    });

    // Initialize all collapse elements and add event listeners
    document.querySelectorAll(".collapse").forEach((collapseEl) => {
      // Initialize with Bootstrap collapse
      bootstrap.Collapse.getOrCreateInstance(collapseEl);

      // Add event listeners for collapse events
      collapseEl.addEventListener("show.bs.collapse", function () {
        const button = document.querySelector(`[data-bs-target="#${this.id}"]`);
        if (button) {
          button.setAttribute("aria-expanded", "true");
          const icon = button.querySelector("i");
          if (icon) {
            icon.classList.remove("bi-chevron-up");
            icon.classList.add("bi-chevron-down");
          }
        }
      });

      collapseEl.addEventListener("hide.bs.collapse", function () {
        const button = document.querySelector(`[data-bs-target="#${this.id}"]`);
        if (button) {
          button.setAttribute("aria-expanded", "false");
          const icon = button.querySelector("i");
          if (icon) {
            icon.classList.remove("bi-chevron-down");
            icon.classList.add("bi-chevron-up");
          }
        }
      });
    });
  }

  // Initialize vehicle info modal
  const vehicleInfoModal = new bootstrap.Modal(
    document.getElementById("vehicleInfoModal")
  );

  const vehicleSpecs = {
    "small-van": {
      name: "Small Van",
      specs: {
        "Internal Length": "1.83M",
        "Internal Width": "1.54M",
        "Internal Height": "1.26M",
        "Loadspace Volume": "3.55m³",
        "Maximum Carrying Capacity": "400kg",
        "Rear door height": "1.2M",
        "Pallet capacity": "1",
        "Width between wheel arches": "1.24M",
      },
      temperatureControlledSpecs: {
        "Internal Length": "1.83M",
        "Internal Width": "1.54M",
        "Internal Height": "1.26M",
        "Loadspace Volume": "3.55m³",
        "Maximum Carrying Capacity": "350kg", // Reduced due to refrigeration equipment
        "Rear door height": "1.2M",
        "Pallet capacity": "1",
        "Width between wheel arches": "1.24M",
      },
    },
    "transit-van": {
      name: "Transit Van",
      specs: {
        "Internal Length": "2.9M",
        "Internal Width": "1.78M",
        "Internal Height": "1.88M",
        "Loadspace Volume": "9.70m³",
        "Maximum Carrying Capacity": "1000kg",
        "Rear door height": "1.74M",
        "Pallet capacity": "2",
        "Width between wheel arches": "1.39m",
      },
      temperatureControlledSpecs: {
        "Internal Length": "2.9M",
        "Internal Width": "1.78M",
        "Internal Height": "1.88M",
        "Loadspace Volume": "9.70m³",
        "Maximum Carrying Capacity": "850kg", // Reduced due to refrigeration equipment
        "Rear door height": "1.74M",
        "Pallet capacity": "2",
        "Width between wheel arches": "1.39m",
      },
    },
    "lwb-transit": {
      name: "LWB Transit",
      specs: {
        "Internal Length": "3.4M",
        "Internal Width": "1.78M",
        "Width between wheel arches": "1.39m",
        "Internal Height": "1.88m",
        "Rear Door Height": "1.74M",
        "Loadspace Volume": "11.37m³",
        "Maximum Carrying Capacity": "1400kg",
        "Pallet Capacity (Standard/Euro)": "3",
      },
      temperatureControlledSpecs: {
        "Internal Length": "3.4M",
        "Internal Width": "1.78M",
        "Width between wheel arches": "1.39m",
        "Internal Height": "1.88m",
        "Rear Door Height": "1.74M",
        "Loadspace Volume": "11.37m³",
        "Maximum Carrying Capacity": "1200kg", // Reduced due to refrigeration equipment
        "Pallet Capacity (Standard/Euro)": "3",
      },
    },
    "xlwb-transit": {
      name: "XLWB Transit",
      specs: {
        "Internal Length": "4.2M",
        "Internal Width": "1.78M",
        "Width between wheel arches": "1.39M",
        "Internal Height": "2M",
        "Rear Door Height": "1.88M",
        "Loadspace Volume": "14.9M³",
        "Maximum Carrying Capacity": "1100kg",
        "Pallet Capacity (Standard/Euro)": "4",
      },
      temperatureControlledSpecs: {
        "Internal Length": "4.2M",
        "Internal Width": "1.78M",
        "Width between wheel arches": "1.39M",
        "Internal Height": "2M",
        "Rear Door Height": "1.88M",
        "Loadspace Volume": "14.9M³",
        "Maximum Carrying Capacity": "950kg", // Reduced due to refrigeration equipment
        "Pallet Capacity (Standard/Euro)": "4",
      },
    },
    "luton-van": {
      name: "Luton Van",
      specs: {
        "Internal Length": "4M",
        "Internal Width": "2M",
        "Internal Height": "2M",
        "Rear Door Height": "1.9M",
        "Loadspace Volume": "16M³",
        "Maximum Carrying Capacity": "1100kg",
        "Pallet Capacity (Standard/Euro)": "6",
      },
      temperatureControlledSpecs: {
        "Internal Length": "4M",
        "Internal Width": "2M",
        "Internal Height": "2M",
        "Rear Door Height": "1.9M",
        "Loadspace Volume": "16M³",
        "Maximum Carrying Capacity": "950kg", // Reduced due to refrigeration equipment
        "Pallet Capacity (Standard/Euro)": "6",
      },
    },
    "7.5t-lorry": {
      name: "7.5t Lorry",
      specs: {
        "Internal Length": "6M",
        "Internal Width": "2.4M",
        "Internal Height": "2.2M",
        "Loadspace Volume": "31M³",
        "Maximum Carrying Capacity": "2500kg",
        "Pallet Capacity (Standard)": "10",
        "Pallet Capacity (Euro)": "12",
      },
      temperatureControlledSpecs: {
        "Internal Length": "6M",
        "Internal Width": "2.4M",
        "Internal Height": "2.2M",
        "Loadspace Volume": "31M³",
        "Maximum Carrying Capacity": "2200kg", // Reduced due to refrigeration equipment
        "Pallet Capacity (Standard)": "10",
        "Pallet Capacity (Euro)": "12",
      },
    },
    "18t-lorry": {
      name: "18t Lorry",
      specs: {
        "Internal Length": "7M",
        "Internal Width": "2.4M",
        "Internal Height": "2.5M",
        "Loadspace Volume": "42M³",
        "Maximum Carrying Capacity": "9000kg",
        "Pallet capacity (Standard/Euro)": "14",
      },
      temperatureControlledSpecs: {
        "Internal Length": "7M",
        "Internal Width": "2.4M",
        "Internal Height": "2.5M",
        "Loadspace Volume": "42M³",
        "Maximum Carrying Capacity": "8500kg", // Reduced due to refrigeration equipment
        "Pallet capacity (Standard/Euro)": "14",
      },
    },
    "26t-lorry": {
      name: "26t Lorry",
      specs: {
        "Internal Length": "8M",
        "Internal Width": "2.4M",
        "Internal Height": "2.5M",
        "Loadspace Volume": "48M³",
        "Maximum Carrying Capacity": "15,000kg",
        "Pallet capacity (Standard)": "16",
        "Pallet capacity (Euro)": "20",
      },
      temperatureControlledSpecs: {
        "Internal Length": "8M",
        "Internal Width": "2.4M",
        "Internal Height": "2.5M",
        "Loadspace Volume": "48M³",
        "Maximum Carrying Capacity": "14,200kg", // Reduced due to refrigeration equipment
        "Pallet capacity (Standard)": "16",
        "Pallet capacity (Euro)": "20",
      },
    },
    "13.6m-artic": {
      name: "13.6m (Artic)",
      specs: {
        "Internal Length": "13.6M",
        "Internal Width": "2.5M",
        "Internal Height": "2.6M",
        "Loadspace Volume": "88M³",
        "Maximum Carrying Capacity": "26,000kg",
        "Pallet capacity (Standard)": "26",
        "Pallet capacity (Euro)": "32",
      },
      temperatureControlledSpecs: {
        "Internal Length": "13.6M",
        "Internal Width": "2.5M",
        "Internal Height": "2.6M",
        "Loadspace Volume": "88M³",
        "Maximum Carrying Capacity": "24,500kg", // Reduced due to refrigeration equipment
        "Pallet capacity (Standard)": "26",
        "Pallet capacity (Euro)": "32",
      },
    },
  };

  // Store current vehicle type and temperature control state
  let currentVehicleType = "";
  let isTemperatureControlled = false;

  // Function to update vehicle specifications display
  function updateVehicleSpecs(vehicleType, temperatureControlled = false) {
    const vehicle = vehicleSpecs[vehicleType];
    if (!vehicle) return;

    const vehicleInfoSection = document.querySelector(".vehicle-info .vehicle-specs-list");
    const specsToShow = temperatureControlled
      ? vehicle.temperatureControlledSpecs
      : vehicle.specs;

    let specsHtml = "";
    for (const [key, value] of Object.entries(specsToShow)) {
      specsHtml += `
            <div class="spec-item d-flex justify-content-between">
                <span class="spec-label">${key}</span>
                <span class="spec-value">${value}</span>
            </div>
        `;
    }
    vehicleInfoSection.innerHTML = specsHtml;
  }

  // Function to update modal content with vehicle specifications
  function updateVehicleModal(vehicleType) {
    const vehicle = vehicleSpecs[vehicleType];
    if (!vehicle) return;

    // Store current vehicle type
    currentVehicleType = vehicleType;
    isTemperatureControlled = false;

    const modalTitle = document.querySelector("#vehicleInfoModal .modal-title");
    modalTitle.textContent = vehicle.name;

    // Show/hide options based on vehicle type
    const smallVanOnly = document.querySelectorAll(".small-van-only");
    const transitVanOnly = document.querySelectorAll(".transit-van-only");
    const lwbTransitOnly = document.querySelectorAll(".lwb-transit-only");
    const xlwbTransitOnly = document.querySelectorAll(".xlwb-transit-only");
    const lutonVanOnly = document.querySelectorAll(".luton-van-only");
    const lorryOnly = document.querySelectorAll(".lorry-only");
    const lorry7_5tOnly = document.querySelectorAll(".lorry-7-5t-only");
    const lorry18tOnly = document.querySelectorAll(".lorry-18t-only");
    const lorry26tOnly = document.querySelectorAll(".lorry-26t-only");
    const lorryArticOnly = document.querySelectorAll(".lorry-artic-only");

    // Hide all options first
    smallVanOnly.forEach((el) => (el.style.display = "none"));
    transitVanOnly.forEach((el) => (el.style.display = "none"));
    lwbTransitOnly.forEach((el) => (el.style.display = "none"));
    xlwbTransitOnly.forEach((el) => (el.style.display = "none"));
    lutonVanOnly.forEach((el) => (el.style.display = "none"));
    lorryOnly.forEach((el) => (el.style.display = "none"));
    lorry7_5tOnly.forEach((el) => (el.style.display = "none"));
    lorry18tOnly.forEach((el) => (el.style.display = "none"));
    lorry26tOnly.forEach((el) => (el.style.display = "none"));
    lorryArticOnly.forEach((el) => (el.style.display = "none"));

    // Show options based on vehicle type
    if (vehicleType === "small-van") {
      smallVanOnly.forEach((el) => (el.style.display = "block"));
    } else if (vehicleType === "transit-van") {
      transitVanOnly.forEach((el) => (el.style.display = "block"));
      // Set Box/Panel as checked and disabled
      const boxPanelTransit = document.getElementById("box-panel-transit");
      if (boxPanelTransit) {
        boxPanelTransit.checked = true;
        boxPanelTransit.disabled = true;
      }
      // Hide temperature options initially
      const tempOptions = document.querySelector(
        ".temperature-options.transit-van-only"
      );
      if (tempOptions) tempOptions.style.display = "none";
    } else if (vehicleType === "lwb-transit") {
      lwbTransitOnly.forEach((el) => (el.style.display = "block"));
      // Set Box/Panel as checked and disabled
      const boxPanelTransit = document.getElementById("box-panel-transit");
      if (boxPanelTransit) {
        boxPanelTransit.checked = true;
        boxPanelTransit.disabled = true;
      }
      // Hide temperature options initially
      const tempOptions = document.querySelector(
        ".temperature-options.lwb-transit-only"
      );
      if (tempOptions) tempOptions.style.display = "none";
    } else if (vehicleType === "xlwb-transit") {
      xlwbTransitOnly.forEach((el) => (el.style.display = "block"));
      // Set Box/Panel as checked and disabled
      const boxPanelTransit = document.getElementById("box-panel-transit");
      if (boxPanelTransit) {
        boxPanelTransit.checked = true;
        boxPanelTransit.disabled = true;
      }
      // Hide temperature options initially
      const tempOptions = document.querySelector(
        ".temperature-options.xlwb-transit-only"
      );
      if (tempOptions) tempOptions.style.display = "none";
    } else if (vehicleType === "luton-van") {
      lutonVanOnly.forEach((el) => (el.style.display = "block"));
      // Set Box/Panel as checked by default
      const boxPanelLuton = document.getElementById("box-panel-luton");
      if (boxPanelLuton) {
        boxPanelLuton.checked = true;
      }
      // Hide temperature options initially
      const tempOptions = document.querySelector(
        ".temperature-options.luton-van-only"
      );
      if (tempOptions) tempOptions.style.display = "none";
    } else if (vehicleType === "7.5t-lorry") {
      lorryOnly.forEach((el) => (el.style.display = "block"));
      lorry7_5tOnly.forEach((el) => (el.style.display = "block"));
      // Set Box/Panel as checked by default
      const boxPanelLorry = document.getElementById("box-panel-lorry");
      if (boxPanelLorry) {
        boxPanelLorry.checked = true;
      }
      // Hide temperature options initially
      const tempOptions = document.querySelector(
        ".temperature-options.lorry-7-5t-only"
      );
      if (tempOptions) tempOptions.style.display = "none";
    } else if (vehicleType === "18t-lorry") {
      lorryOnly.forEach((el) => (el.style.display = "block"));
      lorry18tOnly.forEach((el) => (el.style.display = "block"));
      // Set Box/Panel as checked by default
      const boxPanelLorry = document.getElementById("box-panel-lorry");
      if (boxPanelLorry) {
        boxPanelLorry.checked = true;
      }
      // Hide temperature options initially
      const tempOptions = document.querySelector(
        ".temperature-options.lorry-18t-only"
      );
      if (tempOptions) tempOptions.style.display = "none";
    } else if (vehicleType === "26t-lorry") {
      lorryOnly.forEach((el) => (el.style.display = "block"));
      lorry26tOnly.forEach((el) => (el.style.display = "block"));
      // Set Box/Panel as checked by default
      const boxPanelLorry = document.getElementById("box-panel-lorry");
      if (boxPanelLorry) {
        boxPanelLorry.checked = true;
      }
      // Hide temperature options initially
      const tempOptions = document.querySelector(
        ".temperature-options.lorry-26t-only"
      );
      if (tempOptions) tempOptions.style.display = "none";
    } else if (vehicleType === "13.6m-artic") {
      lorryOnly.forEach((el) => (el.style.display = "block"));
      lorryArticOnly.forEach((el) => (el.style.display = "block"));
      // Set Box/Panel as checked by default
      const boxPanelLorry = document.getElementById("box-panel-lorry");
      if (boxPanelLorry) {
        boxPanelLorry.checked = true;
      }
      // Hide temperature options initially
      const tempOptions = document.querySelector(
        ".temperature-options.lorry-artic-only"
      );
      if (tempOptions) tempOptions.style.display = "none";
    }

    // Reset all temperature controls
    const allTempControls = document.querySelectorAll(".temperature-control");
    allTempControls.forEach((control) => {
      control.checked = false;
    });

    // Add event listeners for temperature control - TOGGLEABLE VERSION
    const temperatureControls = document.querySelectorAll(
      ".temperature-control"
    );
    temperatureControls.forEach((control) => {
      // Remove existing event listeners by cloning
      const newControl = control.cloneNode(true);
      control.parentNode.replaceChild(newControl, control);

      // Ensure it's a checkbox, not a radio button
      newControl.type = "checkbox";

      newControl.addEventListener("change", function () {
        isTemperatureControlled = this.checked;

        // Find the corresponding temperature options based on vehicle type
        let temperatureOptionsSelector = "";

        if (vehicleType === "small-van") {
          temperatureOptionsSelector = ".temperature-options.small-van-only";
        } else if (vehicleType === "transit-van") {
          temperatureOptionsSelector = ".temperature-options.transit-van-only";
        } else if (vehicleType === "lwb-transit") {
          temperatureOptionsSelector = ".temperature-options.lwb-transit-only";
        } else if (vehicleType === "xlwb-transit") {
          temperatureOptionsSelector = ".temperature-options.xlwb-transit-only";
        } else if (vehicleType === "luton-van") {
          temperatureOptionsSelector = ".temperature-options.luton-van-only";
        } else if (vehicleType === "7.5t-lorry") {
          temperatureOptionsSelector = ".temperature-options.lorry-7-5t-only";
        } else if (vehicleType === "18t-lorry") {
          temperatureOptionsSelector = ".temperature-options.lorry-18t-only";
        } else if (vehicleType === "26t-lorry") {
          temperatureOptionsSelector = ".temperature-options.lorry-26t-only";
        } else if (vehicleType === "13.6m-artic") {
          temperatureOptionsSelector = ".temperature-options.lorry-artic-only";
        }

        const temperatureOptions = document.querySelector(
          temperatureOptionsSelector
        );
        if (temperatureOptions) {
          temperatureOptions.style.display = this.checked ? "block" : "none";

          // Update vehicle specifications based on temperature control
          updateVehicleSpecs(currentVehicleType, this.checked);

          // Uncheck all temperature type checkboxes when toggling off
          if (!this.checked) {
            const checkboxes = temperatureOptions.querySelectorAll(
              'input[type="checkbox"]'
            );
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
          }
        }
      });
    });

    // Add event listeners for body type selection (Luton and Lorries)
    const bodyTypeLuton = document.querySelectorAll(
      'input[name="body-type-luton"]'
    );
    bodyTypeLuton.forEach((radio) => {
      // Remove existing event listeners
      const newRadio = radio.cloneNode(true);
      radio.parentNode.replaceChild(newRadio, radio);

      newRadio.addEventListener("change", function () {
        const temperatureControl = document.querySelector(
          ".temperature-control-section.luton-van-only"
        );
        const temperatureOptions = document.querySelector(
          ".temperature-options.luton-van-only"
        );
        const tailLift = document.querySelector(".tail-lift-luton");

        if (this.id === "box-panel-luton") {
          temperatureControl.style.display = "block";
          if (tailLift) tailLift.style.display = "none";
          // Reset temperature control
          const tempControl = temperatureControl.querySelector(
            ".temperature-control"
          );
          if (tempControl) {
            tempControl.checked = false;
            isTemperatureControlled = false;
            updateVehicleSpecs(currentVehicleType, false);
            if (temperatureOptions) {
              temperatureOptions.style.display = "none";
              const checkboxes = temperatureOptions.querySelectorAll(
                'input[type="checkbox"]'
              );
              checkboxes.forEach((checkbox) => (checkbox.checked = false));
            }
          }
        } else {
          temperatureControl.style.display = "none";
          if (tailLift) tailLift.style.display = "block";
          isTemperatureControlled = false;
          updateVehicleSpecs(currentVehicleType, false);
          // Hide temperature options if they were visible
          if (temperatureOptions) {
            temperatureOptions.style.display = "none";
            const checkboxes = temperatureOptions.querySelectorAll(
              'input[type="checkbox"]'
            );
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
          }
        }
      });
    });

    const bodyTypeLorry = document.querySelectorAll(
      'input[name="body-type-lorry"]'
    );
    bodyTypeLorry.forEach((radio) => {
      // Remove existing event listeners
      const newRadio = radio.cloneNode(true);
      radio.parentNode.replaceChild(newRadio, radio);

      newRadio.addEventListener("change", function () {
        // Get the vehicle type from the radio button's parent class
        const radioGroup = this.closest(".radio-btn-group");
        const vehicleClass = Array.from(radioGroup.classList).find((cls) =>
          cls.includes("lorry-")
        );

        if (vehicleClass) {
          // Extract the lorry type (7-5t, 18t, 26t, or artic)
          const lorryType = vehicleClass.replace("lorry-", "");
          const temperatureControl = document.querySelector(
            `.temperature-control-section.${vehicleClass}`
          );
          const temperatureOptions = document.querySelector(
            `.temperature-options.${vehicleClass}`
          );
          const tailLift = document.querySelector(`.tail-lift-${lorryType}`);

          if (this.id === "box-panel-lorry") {
            // Show temperature control, hide tail lift
            if (temperatureControl) temperatureControl.style.display = "block";
            if (tailLift) tailLift.style.display = "none";

            // Reset temperature control
            const tempControl = temperatureControl
              ? temperatureControl.querySelector(".temperature-control")
              : null;
            if (tempControl) {
              tempControl.checked = false;
              isTemperatureControlled = false;
              updateVehicleSpecs(currentVehicleType, false);
              if (temperatureOptions) {
                temperatureOptions.style.display = "none";
                const checkboxes = temperatureOptions.querySelectorAll(
                  'input[type="checkbox"]'
                );
                checkboxes.forEach((checkbox) => (checkbox.checked = false));
              }
            }
          } else if (this.id === "curtain-sider-lorry") {
            // Hide temperature control, show tail lift
            if (temperatureControl) temperatureControl.style.display = "none";
            if (tailLift) tailLift.style.display = "block";

            isTemperatureControlled = false;
            updateVehicleSpecs(currentVehicleType, false);

            // Hide temperature options if they were visible
            if (temperatureOptions) {
              temperatureOptions.style.display = "none";
              const checkboxes = temperatureOptions.querySelectorAll(
                'input[type="checkbox"]'
              );
              checkboxes.forEach((checkbox) => (checkbox.checked = false));
            }
          }
        }
      });
    });

    // Update initial vehicle specifications
    updateVehicleSpecs(vehicleType, false);
  }

  vehicleOptions.forEach((card) => {
    const infoIcon = card.querySelector(".info-icon");
    const vehicleType =
      card.getAttribute("data-vehicle") ||
      card
        .querySelector(".vehicle-name")
        .textContent.trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    if (infoIcon) {
      infoIcon.addEventListener("click", (e) => {
        e.preventDefault();
        updateVehicleModal(vehicleType);
        const modal = new bootstrap.Modal(
          document.getElementById("vehicleInfoModal")
        );
        modal.show();
      });
    }
  });

  // Function to update delete buttons state
  function updateDeleteButtonsState(container) {
    const stops = container.querySelectorAll(".collection-form");
    stops.forEach((stop) => {
      const deleteBtn = stop.querySelector(".icon-btn.delete");
      if (deleteBtn) {
        if (stops.length === 1) {
          deleteBtn.classList.add("disabled");
          deleteBtn.style.opacity = "0.5";
          deleteBtn.style.cursor = "not-allowed";
        } else {
          deleteBtn.classList.remove("disabled");
          deleteBtn.style.opacity = "1";
          deleteBtn.style.cursor = "pointer";
        }
      }
    });
  }

  // Setup form events (delete, move up/down)
  function setupFormEvents(form) {
    // Delete button
    const deleteBtn = form.querySelector(".delete");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        const container = form.parentElement;
        const stops = container.querySelectorAll(".collection-form");

        // Only allow delete if there's more than one stop
        if (stops.length > 1) {
          form.remove();
          updateDeleteButtonsState(container);
          updateCounters(); // Adjust the counter when a form is removed
        }
      });
    }

    // Move up button
    form.querySelector(".move-up")?.addEventListener("click", function () {
      const prev = form.previousElementSibling;
      if (prev) {
        form.parentNode.insertBefore(form, prev);
      }
    });

    // Move down button
    form.querySelector(".move-down")?.addEventListener("click", function () {
      const next = form.nextElementSibling;
      if (next) {
        form.parentNode.insertBefore(next, form);
      }
    });
  }

  // Function to get next counter number based on existing forms
  function getNextCounterNumber(container) {
    const existingForms = container.querySelectorAll(".collection-form");
    return existingForms.length + 1;
  }

  // Function to get service-specific container
  function getServiceSpecificContainer(button, type) {
    // Try to find container within the closest col-md-6 first
    let container = button.closest(".col-md-6")?.querySelector(`#${type}Container`);
    if (!container) {
      // fallback to global containers
      container = type === "collection" ? collectionContainer : deliveryContainer;
    }
    return container;
  }

  // Add Collection/Delivery Point
  function setupAddPointButtons() {
    document.querySelectorAll(".add-point-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const type = this.getAttribute("data-add-type");
        const container = getServiceSpecificContainer(this, type);
        
        console.log('Button clicked for type:', type, 'container:', container);
        
        // Use global destination counter for consistent numbering
        const destinationNumber = getNextGlobalDestinationNumber();
        
        console.log('Using destination number:', destinationNumber);

        const formId = `${type}${destinationNumber}`;
        const newForm = document.createElement("div");
        newForm.className = "card collection-form mb-3";
        newForm.setAttribute("data-form-type", type);
        // Don't mark dynamically created forms as initial

        newForm.innerHTML = `
                    \u003cdiv class="card-header"\u003e
                        \u003cdiv class="d-flex align-items-center w-100 mb-2"\u003e
                            \u003cspan class="drag-handle me-1"\u003e
                                \u003ci class="bi bi-grip-vertical"\u003e\u003c/i\u003e
                            \u003c/span\u003e
                            \u003cdiv class="d-flex justify-content-between align-items-center w-100"\u003e
                                \u003cdiv\u003e
                                    \u003csmall\u003eDestination ${destinationNumber}  [Post Code]\u003c/small\u003e
                                </div>
                                <button class="collapse-icon btn p-0" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapse${formId}"
                                    aria-expanded="false">
                                    <i class="bi bi-chevron-up"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="collapse" id="collapse${formId}">
                        <div class="card-body">
                            <div class="d-flex justify-content-end mb-3">
                                <div class="action-icons">
                                    <button class="icon-btn">
                                        <i class="bi bi-arrow-up"></i>
                                    </button>
                                    <button class="icon-btn">
                                        <i class="bi bi-arrow-down"></i>
                                    </button>
                                    <button class="icon-btn delete">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Country<span class="text-danger">*</span></label>
                                <select class="form-select" required>
                                    <option value="" selected>Select country</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="us">United States</option>
                                    <option value="ca">Canada</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${
                                  type === "collection"
                                    ? "Collection"
                                    : "Delivery"
                                } Postcode<span class="text-danger">*</span></label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label for="collection-date" class="form-label">Date<span class="text-danger">*</span></label>
                                <input type="date" class="form-control" placeholder="Select date" required>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Ready At<span class="text-danger">*</span></label>
                                    <select class="form-select" required>
                                        <option value="" selected>Ready at</option>
                                        <option value="9:00">9:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Collect By<span class="text-danger">*</span></label>
                                    <select class="form-select" required>
                                        <option value="" selected>Collect by</option>
                                        <option value="15:00">3:00 PM</option>
                                        <option value="16:00">4:00 PM</option>
                                        <option value="17:00">5:00 PM</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="form-check large-checkbox">
                                    <input class="form-check-input" type="checkbox">
                                    <label class="form-check-label label-text">Helper</label>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

        container.appendChild(newForm);

        // Initialize collapse for the new form
        const collapseElement = newForm.querySelector(".collapse");
        const collapseButton = newForm.querySelector(".collapse-icon");
        if (collapseElement && collapseButton) {
          new bootstrap.Collapse(collapseElement);
          collapseButton.addEventListener("click", function () {
            const isCurrentlyExpanded =
              this.getAttribute("aria-expanded") === "true";
            this.setAttribute("aria-expanded", !isCurrentlyExpanded);

            const icon = this.querySelector("i");
            if (icon) {
              if (isCurrentlyExpanded) {
                icon.classList.remove("bi-chevron-up");
                icon.classList.add("bi-chevron-down");
              } else {
                icon.classList.remove("bi-chevron-down");
                icon.classList.add("bi-chevron-up");
              }
            }
          });
        }

        setupFormEvents(newForm);
        updateDeleteButtonsState(container);
        updateCounters(); // Update counters after adding new form
      });
    });
  }

  // Service card selection
  function setupServiceCards() {
    serviceCards.forEach((card) => {
      const selectBtn = card.querySelector(".select-btn");

      selectBtn?.addEventListener("click", function (e) {
        e.stopPropagation();
        selectService(card);
      });

      card.addEventListener("click", function (e) {
        if (!e.target.closest(".select-btn")) {
          selectService(card);
        }
      });
    });
  }

  function selectService(card) {
    // Remove selection from all cards
    serviceCards.forEach((c) => {
      c.classList.remove("selected");
      const btn = c.querySelector(".select-btn");
      const badge = c.querySelector(".selected-badge");

      if (btn) btn.style.display = "block";
      if (badge) badge.remove();
    });

    // Add selection to clicked card
    card.classList.add("selected");
    const btn = card.querySelector(".select-btn");
    const serviceInfo = card.querySelector(".service-info");

    if (btn) btn.style.display = "none";

    if (serviceInfo) {
      const selectedBadge = document.createElement("div");
      selectedBadge.className = "selected-badge";
      selectedBadge.textContent = "SELECTED";
      serviceInfo.appendChild(selectedBadge);
    }

    // Enable next button if on first step
    if (currentStep === 0) {
      nextBtn.disabled = false;
    }
  }

  // Vehicle selection
  function setupVehicleSelection() {
    vehicleOptions.forEach((option) => {
      option.addEventListener("click", function (e) {
        if (e.target.closest(".info-icon")) return;

        vehicleOptions.forEach((opt) => opt.classList.remove("selected"));
        this.classList.add("selected");

        // Enable next button if on vehicle selection step
        if (currentStep === 1) {
          nextBtn.disabled = false;
        }
      });
    });
  }

  // Form navigation
  function setupFormNavigation() {
    nextBtn.addEventListener("click", function () {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });

    prevBtn.addEventListener("click", function () {
      goToStep(currentStep - 1);
    });
  }

  function validateStep(step) {
    // Get the selected service name
    const selectedService = document.querySelector(".service-card.selected");
    const serviceName = selectedService
      ? selectedService.querySelector(".service-name").textContent
      : "";

    switch (step) {
      case 0:
        if (!document.querySelector(".service-card.selected")) {
          alert("Please select a service type");
          return false;
        }
        return true;
      case 1:
        // Skip validation for step 2 if International On-Board Courier is selected
        if (serviceName === "International On-Board Courier") {
          return true;
        }
        if (
          !document.querySelector(".vehicle-option.selected") &&
          serviceName !== "UK & Ireland Pallet Service" &&
          serviceName !== "International Docs & Parcels" &&
          serviceName !== "International Freight"
        ) {
          alert("Please select a vehicle type");
          return false;
        }
        return true;
      case 2:
        if (collectionCounter === 0 || deliveryCounter === 0) {
          alert("Please add at least one collection and one delivery point");
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  function goToStep(step) {
    if (step < 0 || step >= steps.length) return;

    steps[currentStep].classList.remove("active");
    steps[step].classList.add("active");
    currentStep = step;

    updateProgressBar();
    updateButtons();
  }

  function updateProgressBar() {
    const circles = document.querySelectorAll(".step-circle");
    const lines = document.querySelectorAll(".line");

    circles.forEach((circle, index) => {
      circle.classList.toggle("active", index <= currentStep);
    });

    lines.forEach((line, index) => {
      line.classList.remove("active", "half-active");
      if (index < currentStep) {
        line.classList.add("active");
      } else if (index === currentStep) {
        line.classList.add("half-active");
      }
    });
  }

  function updateButtons() {
    prevBtn.style.display = currentStep === 0 ? "none" : "block";
    nextBtn.textContent =
      currentStep === steps.length - 1 ? "REQUEST QUOTE" : "NEXT STEP";

    // Show/hide cancel button based on step
    const cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) {
      cancelBtn.style.display = currentStep === 0 ? "block" : "none";
    }

    // Add click handler for request quote button
    if (currentStep === steps.length - 1) {
      nextBtn.addEventListener("click", handleQuoteSubmission);
    } else {
      nextBtn.removeEventListener("click", handleQuoteSubmission);
    }
  }

  // Handle quote form submission
  function handleQuoteSubmission(e) {
    e.preventDefault();

    // Generate a random quote reference
    const quoteRef =
      "Q" + Math.random().toString(36).substr(2, 6).toUpperCase();

    // Hide the form container
    document.querySelector(".multi-step-form").style.display = "none";

    // Update quote reference and show success page
    document.getElementById("quoteReference").textContent = quoteRef;
    document.getElementById("successPage").style.display = "block";
  }

  // Function to request another quote
  window.requestAnotherQuote = function () {
    // Reset form
    document.getElementById("quoteForm").reset();

    // Reset all service forms
    resetAllServiceForms();
    
    // Reset global destination counter
    resetGlobalDestinationCounter();

    // Remove selected class from all service cards
    serviceCards.forEach((c) => {
      c.classList.remove("selected");
      const btn = c.querySelector(".select-btn");
      const badge = c.querySelector(".selected-badge");
      if (btn) btn.style.display = "block";
      if (badge) badge.remove();
    });

    // Remove selected class from all vehicle options
    vehicleOptions.forEach((opt) => opt.classList.remove("selected"));

    // Hide success page and show form
    document.getElementById("successPage").style.display = "none";
    document.querySelector(".multi-step-form").style.display = "block";

    // Reset to first step
    goToStep(0);
  };

  // Function to go to homepage
  window.goToHomepage = function () {
    window.location.href = "/";
  };

  // Email validation
  const emailInput = document.getElementById("email");
  const emailCheck = document.getElementById("email-check");

  emailInput.addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.value)) {
      emailCheck.classList.remove("d-none");
    } else {
      emailCheck.classList.add("d-none");
    }
  });

  // Phone number formatting
  const phoneInput = document.getElementById("contact-number");
  const countryCode = document.getElementById("country-code");

  phoneInput.addEventListener("input", function (e) {
    // Remove all non-digit characters
    let value = this.value.replace(/\D/g, "");

    // Format the number
    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
          6,
          10
        )}`;
      }
    }

    this.value = value;
  });

  // Function to handle stop reordering
  function setupStopReordering() {
    document.addEventListener("click", function (e) {
      const button = e.target.closest(".icon-btn");
      if (!button) return;

      const isUpButton = button.querySelector(".bi-arrow-up");
      const isDownButton = button.querySelector(".bi-arrow-down");
      if (!isUpButton && !isDownButton) return;

      const stopCard = button.closest(".collection-form");
      if (!stopCard) return;

      const container = stopCard.parentElement;
      const stops = Array.from(container.children);
      const currentIndex = stops.indexOf(stopCard);

      if (isUpButton && currentIndex > 0) {
        // Move up
        container.insertBefore(stopCard, stops[currentIndex - 1]);
        updateStopNumbers(container);
      } else if (isDownButton && currentIndex < stops.length - 1) {
        // Move down
        container.insertBefore(stopCard, stops[currentIndex + 2]);
        updateStopNumbers(container);
      }
    });
  }

  // Function to update destination numbers after reordering
  function updateStopNumbers(container) {
    const stops = container.querySelectorAll(".collection-form");
    stops.forEach((stop, index) => {
      const stopNumberEl = stop.querySelector("small");
      if (stopNumberEl) {
        // Check if this is an initial form with original text that should be preserved
        const isInitialForm = stop.getAttribute('data-initial') === 'true';
        const originalText = stop.getAttribute('data-original-text');
        
        if (isInitialForm && originalText) {
          // Preserve the original text for initial forms
          stopNumberEl.textContent = originalText;
        } else {
          // Use numbered destination format for dynamically added forms
          stopNumberEl.textContent = `Destination ${index + 1}  [Post Code]`;
        }
      }
    });
  }

  // Initialize stop reordering
  setupStopReordering();

  // Mark initial forms as initial to preserve them during clearing
  function markInitialForms() {
    let maxDestinationNumber = 0;
    
    document.querySelectorAll('.collection-form').forEach(form => {
      form.setAttribute('data-initial', 'true');
      
      // Store the original text to preserve it during renumbering
      const stopNumberEl = form.querySelector('small');
      if (stopNumberEl) {
        const originalText = stopNumberEl.textContent;
        form.setAttribute('data-original-text', originalText);
        
        // Extract destination number from text like "Destination 1 [Post Code]"
        const match = originalText.match(/Destination (\d+)/);
        if (match) {
          const destNumber = parseInt(match[1]);
          maxDestinationNumber = Math.max(maxDestinationNumber, destNumber);
        }
      }
    });
    
    // Set global counter to start after the highest existing destination number
    globalDestinationCounter = maxDestinationNumber;
    console.log('Initial global counter set to:', globalDestinationCounter, 'based on max destination:', maxDestinationNumber);
  }

  // Initialize all functionality
  function init() {
    markInitialForms();
    setupCollapse();
    setupAddPointButtons();
    setupServiceCards();
    setupVehicleSelection();
    setupFormNavigation();

    // Add this new code here
    const collectionSelect = document.getElementById("collection");
    const residentialWrapper = document.getElementById(
      "residential-collection-wrapper"
    );
    if (collectionSelect && residentialWrapper) {
      collectionSelect.addEventListener("change", function () {
        residentialWrapper.style.display = collectionSelect.value
          ? "block"
          : "none";
      });
    }

    const deliverySelect = document.getElementById("destination");
    const residentialDeliveryWrapper = document.getElementById(
      "residential-delivery-wrapper"
    );
    if (deliverySelect && residentialDeliveryWrapper) {
      deliverySelect.addEventListener("change", function () {
        residentialDeliveryWrapper.style.display = deliverySelect.value
          ? "block"
          : "none";
      });
    }

    const destinationSelect = document.getElementById("destination");
    const tariffTypeSelect = document.getElementById("tariff-type");

    // Handle collection location change
    collectionSelect.addEventListener("change", function () {
      const selectedCollection = this.value;

      // Clear existing options
      destinationSelect.innerHTML =
        '<option value="" selected disabled>Please select</option>';

      // Reset tariff type
      tariffTypeSelect.innerHTML =
        '<option value="" selected disabled>Select tariff type</option>';

      if (selectedCollection === "ni" || selectedCollection === "si") {
        // If NI or SI selected, only show UK Mainland as destination
        destinationSelect.innerHTML += `
                <option value="uk">UK Mainland</option>
            `;
      } else if (selectedCollection === "uk") {
        // If UK Mainland selected, show all options
        destinationSelect.innerHTML += `
                <option value="uk">UK Mainland</option>
                <option value="ni">Northern Ireland</option>
                <option value="si">Southern Ireland</option>
            `;
      }
    });

    // Handle destination change
    destinationSelect.addEventListener("change", function () {
      const selectedDestination = this.value;

      // Clear existing tariff options
      tariffTypeSelect.innerHTML =
        '<option value="" selected disabled>Select tariff type</option>';

      if (selectedDestination === "uk") {
        // If UK Mainland is selected as destination
        tariffTypeSelect.innerHTML += `
                <option value="economy">Economy</option>
            `;
      } else {
        // For other destinations, show all tariff options
        tariffTypeSelect.innerHTML += `
                <option value="economy">Economy</option>
                <option value="next-day">Next working day</option>
                <option value="next-day-12">Next working day by 12:00</option>
                <option value="saturday">Saturday (Friday Collection)</option>
            `;
      }
    });

    // Setup events for existing forms
    document.querySelectorAll(".collection-form").forEach(setupFormEvents);

    // Initialize delete button states for existing containers
    if (collectionContainer) updateDeleteButtonsState(collectionContainer);
    if (deliveryContainer) updateDeleteButtonsState(deliveryContainer);

    // Initialize first step
    updateButtons();
    updateProgressBar();
  }

  init();

  // Service selection handling
  const vehicleSelectionForm = document.getElementById("vehicleSelectionForm");
  const palletServiceForm = document.getElementById("palletServiceForm");
  const docsParcelForm = document.getElementById("docsParcelForm");
  const freightForm = document.getElementById("freightForm");
  const docsParcelDetailsForm = document.getElementById(
    "docsParcelDetailsForm"
  );
  const internationalTariffServiceDetails = document.getElementById(
    "internationalTariffServiceDetails"
  );
  const journeyDetailsForm = document.getElementById("journeyDetailsForm");
  const palletCrateDetailsForm = document.getElementById(
    "palletCrateDetailsForm"
  );

  // Function to reset all service-specific forms
  function resetAllServiceForms() {
    // Hide all service-specific detail forms
    const formsToHide = [
      "ukNonPalletServiceDetails",
      "palletServiceDetails", 
      "internationalDocsTarifDetails",
      "internationalTariffServiceDetails",
      "palletCrateDetailsForm",
      "journeyDetailsForm",
      "journeyDetailsForm1",
      "docsParcelDetailsForm",
      "internationalFreightForm",
      "palletDetailsForm"
    ];
    
    formsToHide.forEach(formId => {
      const form = document.getElementById(formId);
      if (form) {
        form.style.display = "none";
      }
    });
    
    // Hide main service forms
    if (vehicleSelectionForm) vehicleSelectionForm.style.display = "none";
    if (palletServiceForm) palletServiceForm.style.display = "none";
    if (docsParcelForm) docsParcelForm.style.display = "none";
    if (freightForm) freightForm.style.display = "none";
    
    // Reset journey form classes and clear containers
    resetJourneyFormClasses();
    clearJourneyFormContainers();
    
    // Reset global destination counter for new service
    resetGlobalDestinationCounter();
  }

  // Function to reset journey form classes
  function resetJourneyFormClasses() {
    const journeyForm = document.getElementById('journeyDetailsForm1');
    if (journeyForm) {
      journeyForm.classList.remove('uk-non-standard-economy');
    }
  }

  // Function to clear dynamically added forms but preserve initial forms
  function clearJourneyFormContainers() {
    const journeyForm = document.getElementById('journeyDetailsForm1');
    if (journeyForm) {
      // Find collection and delivery containers within this form
      const collectionContainers = journeyForm.querySelectorAll('[id*="collection"][id*="Container"], [id="collectionContainer"]');
      const deliveryContainers = journeyForm.querySelectorAll('[id*="delivery"][id*="Container"], [id="deliveryContainer"]');
      
      // Only remove dynamically added forms, preserve the initial form
      collectionContainers.forEach(container => {
        const dynamicForms = container.querySelectorAll('.collection-form:not([data-initial="true"])');
        dynamicForms.forEach(form => form.remove());
        // Update destination numbers for remaining forms
        updateStopNumbers(container);
      });
      
      deliveryContainers.forEach(container => {
        const dynamicForms = container.querySelectorAll('.collection-form:not([data-initial="true"])');
        dynamicForms.forEach(form => form.remove());
        // Update destination numbers for remaining forms
        updateStopNumbers(container);
      });
      
      // Update global counters
      updateCounters();
    }
  }

  // Handle service selection
  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove selected class from all cards
      serviceCards.forEach((c) => c.classList.remove("selected"));
      // Add selected class to clicked card
      this.classList.add("selected");

      // Get the service name
      const serviceName = this.querySelector(".service-name").textContent;

      // Reset all forms first to ensure clean state
      resetAllServiceForms();

      function resetAllVehicles() {
        const vehicles = document.querySelectorAll(".vehicle-option");
        vehicles.forEach((vehicle) => {
          const col = vehicle.closest(".col-md-4, .col-md-6");
          if (col) {
            col.style.display = "block";
            // Reset to default column size (adjust as needed)
            col.classList.remove("col-md-4", "col-md-6");
            col.classList.add("col-md-4");
          }
        });
      };

      // Get necessary form elements for step 3
      const palletDetailsForm = document.getElementById("palletDetailsForm");
      const journeyDetailsForm1 = document.getElementById("journeyDetailsForm1");
      
      // Show relevant forms based on service selection
      switch (serviceName) {
        case "International Docs & Parcels":
          document.getElementById("internationalDocsTarifDetails").style.display = "block";
          docsParcelForm.style.display = "block";
          docsParcelDetailsForm.style.display = "block";
          break;

        case "UK Non-Standard Economy":
          document.getElementById("ukNonPalletServiceDetails").style.display = "block";
          vehicleSelectionForm.style.display = "block";
          journeyDetailsForm1.style.display = "block";
          resetJourneyFormClasses();
          
          // Add class for conditional styling
          const journeyForm = document.getElementById('journeyDetailsForm1');
          if (journeyForm) {
            journeyForm.classList.add('uk-non-standard-economy');
          }

          // Show only specific vehicles
          const vehicles = document.querySelectorAll(".vehicle-option");
          vehicles.forEach((vehicle) => {
            const col = vehicle.closest(".col-md-4, .col-md-6");
            if (col) {
              col.style.display = "none";
              col.classList.remove("col-md-4", "col-md-6");
              col.classList.add("col-md-6");
            }
          });

          vehicles.forEach((vehicle) => {
            const vehicleName = vehicle.querySelector(".vehicle-name").textContent.trim();
            if (["Small Van", "Transit Van", "LWB Transit", "XLWB Transit"].includes(vehicleName)) {
              const col = vehicle.closest(".col-md-4, .col-md-6");
              if (col) {
                col.style.display = "block";
              }
            }
          });
          break;

        case "UK & Ireland Pallet Service":
          document.getElementById("palletServiceDetails").style.display = "block";
          palletServiceForm.style.display = "block";
          palletDetailsForm.style.display = "block";
          break;

        case "International Freight":
          internationalTariffServiceDetails.style.display = "block";
          document.getElementById("internationalFreightForm").style.display = "block";
          palletCrateDetailsForm.style.display = "block";
          break;

        case "International On-Board Courier":
          journeyDetailsForm.style.display = "block";
          docsParcelDetailsForm.style.display = "block";
          break;

        case "UK/EUROPE Time-Critical Courier":
          vehicleSelectionForm.style.display = "block";
          journeyDetailsForm1.style.display = "block";
          resetJourneyFormClasses();
          resetAllVehicles();
          
          // Show all vehicles
          document.querySelectorAll(".vehicle-option").forEach((vehicle) => {
            vehicle.style.display = "block";
          });
          break;

        default:
          break;
      }

      // Enable the next button
      const nextBtn = document.getElementById("nextBtn");
      nextBtn.disabled = false;

      // For On-Board Courier, modify the next button to skip step 2
      if (serviceName === "International On-Board Courier") {
        // nextBtn.addEventListener('click', function onBoardNextClick(e) {
        //     e.preventDefault();
        //     // Remove this specific click handler after it's used
        //     nextBtn.removeEventListener('click', onBoardNextClick);
        //     // Go directly to step 3
        //     goToStep(2);
        // }, { once: true }); // Use once:true to ensure the listener is removed after first use
      }
    });
  });

  const palletServiceDetails = document.getElementById("palletServiceDetails");
  
  // Add other elements here that might need resetting
  // Example: const addDeliveryBtn = document.querySelector('[data-add-type="delivery"]');
  // if (addDeliveryBtn) addDeliveryBtn.style.display = "block";



  // Get the tariff type select element
  const tariffTypeSelect = document.getElementById("tariff-type");
  const tariffContent = document.getElementById("tariff-content");

  if (tariffTypeSelect && tariffContent) {
    tariffTypeSelect.addEventListener("change", function () {
      const selectedTariff = this.value;
      let tariffDetails = "";

      switch (selectedTariff) {
        case "next-day":
          tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                        <p class="mb-1">Available to all postcodes except for collections and deliveries in:Scotland</p>
                        <p class="mb-0">AB (exc 10-13, 15-16, 21-25), IV, PA20+ & PH15+</p>
                    `;
          break;

        case "next-day-12":
          tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                        <p class="mb-1">Available to all postcodes except for collections and deliveries in:Scotland</p>
                        <p class="mb-0">AB10-13, 15-6, 21-25, DG, EH, FK, G, IV, KA (exc KA27-28), KY, ML, PA, PH & TD</p>
                    `;
          break;

        case "saturday":
          tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                        <p class="mb-1">Available to all postcodes except for collections and deliveries in:Scotland</p>
                        <p class="mb-0">AB (exc 10-13, 15-16, 21-25), IV, PA20+ & PH15+</p>
                    `;
          break;

        default:
          tariffDetails = ""; // Clear the content if no specific tariff is selected
          break;
      }

      tariffContent.innerHTML = tariffDetails;
    });
  }

  // Get the tariff type select element
  const tariffTypeSelectInternational = document.getElementById(
    "tariff-type-international"
  );
  const tariffContentInternational = document.getElementById(
    "tariff-content-international"
  );

  if (tariffTypeSelectInternational && tariffContentInternational) {
    tariffTypeSelectInternational.addEventListener("change", function () {
      const selectedTariff = this.value;
      let tariffDetails = "";

      switch (selectedTariff) {
        case "express":
          tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                        <p class="mb-1"><a href="https://staging.sameday-delivery.co.uk/export-transit">International Export Transit Times</a></p>
                        <p class="mb-0">Express, time-definite, door-to-door, customs-cleared delivery service for documents and packages up to 50 kg.</p>
                    `;
          break;

        case "economy":
          tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                       <p class="mb-1"><a href="https://staging.sameday-delivery.co.uk/export-transit">International Export Transit Times</a></p>
                        <p class="mb-0">Cost-effective delivery to EU countries within two to four days and to the rest of the world within two to six days for documents and packages up to 50 kg.</p>
                    `;
          break;

        case "express-12":
          tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                       <p class="mb-1"><a href="https://staging.sameday-delivery.co.uk/export-transit">International Export Transit Times</a></p>
                        <p class="mb-0">Guaranteed next-day delivery before 12 noon to major cities for documents and packages up to 50 kg.</p>
                    `;
          break;

        case "express-9":
          tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                       <p class="mb-1"><a href="https://staging.sameday-delivery.co.uk/export-transit">International Export Transit Times</a></p>
                        <p class="mb-0">Guaranteed next-day delivery before 9 am to major cities for documents and packages up to 50 kg.</p>
                    `;
          break;

        default:
          tariffDetails = ""; // Clear the content if no specific tariff is selected
          break;
      }

      tariffContentInternational.innerHTML = tariffDetails;
    });
  }

  // Get the tariff type select element
  const tariffTypeSelectInternationalFreight = document.getElementById(
    "tariff-type-international-freight"
  );
  const tariffContentFreight = document.getElementById(
    "tariff-content-international-freight"
  );

  if (tariffTypeSelectInternationalFreight && tariffContentFreight) {
    tariffTypeSelectInternationalFreight.addEventListener(
      "change",
      function () {
        const selectedTariff = this.value;
        let tariffDetails = "";

        switch (selectedTariff) {
          case "air-freight":
            tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                        <p class="mb-0">For imports and exports of items that exceed 50 kg. Consignments can include oversized or awkward freight.</p>
                    `;
            break;

          case "road-freight":
            tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                        <p class="mb-1">For non-urgent items that exceed 50 kg.</p>
                        <p class="mb-1">Door-to-door service to European countries.</p>
                        <p class="mb-0">Consignments can include oversized or awkward freight.</p>


                    `;
            break;

          case "sea-freight":
            tariffDetails = `
                    <p class="mb-1"><strong>Tariff details</strong></p>
                        <p class="mb-0">For general cargo & containers to be sent a long distance where speed is unimportant.</p>
                    `;
            break;

          default:
            tariffDetails = ""; // Clear the content if no specific tariff is selected
            break;
        }

        tariffContentFreight.innerHTML = tariffDetails;
      }
    );
  }
});
