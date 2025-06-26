export const tourSteps = [
  {
    element: '.title-button',
    popover: {
      description: 'Feel free to skip this tutorial. You can bring it up at anytime by pressing this button.',
      align: 'center',
      side: 'right'
    },
    onHighlighted: element => {
      element.classList.add('idle');
    },
    onDeselected: element => {
      element.classList.remove('idle');
    }
  },
  {
    element: '.generate-maze-dropdown',
    popover: {
      description:
        'Select a maze generation algorithm to generate a maze for you.</br></br>Or you can even draw your own by clicking and dragging your mouse on the grid!',
      align: 'center',
      side: 'bottom'
    },
    onHighlighted: element => {
      element.classList.add('idle');
    },
    onDeselected: element => {
      element.classList.remove('idle');
    }
  },
  {
    element: '.generate-maze-button',
    popover: {
      description: 'You can then use this button to generate the maze.',
      align: 'center',
      side: 'bottom'
    },
    onHighlighted: element => {
      element.classList.add('idle');
      // element.click();
    },
    onDeselected: element => {
      element.classList.remove('idle');
    }
  },
  {
    element: '.algorithm-dropdown',
    popover: {
      description: "Select the pathfinding algorithm you'd like to visualize...",
      align: 'center',
      side: 'bottom'
    },
    onHighlighted: element => {
      element.classList.add('idle');
      // element.value = 'a-star';
      // element.dispatchEvent(new Event('change', { bubbles: true }));
    },
    onDeselected: element => {
      element.classList.remove('idle');
    }
  },
  {
    element: '.visualize-button',
    popover: {
      description: 'and visualize it!',
      align: 'center',
      side: 'bottom'
    },
    onHighlighted: element => {
      element.classList.add('idle');
      // element.click();
    },
    onDeselected: element => {
      element.classList.remove('idle');
    }
  },
  {
    element: '.sidebar-button',
    popover: {
      description: 'Advanced settings can be found here.',
      align: 'center',
      side: 'left'
    },
    onHighlighted: element => {
      element.classList.add('idle');
    },
    onDeselected: element => {
      element.classList.remove('idle');
      // const clearAllButton = document.querySelector('.clear-all-button');
      // if (clearAllButton) {
      //   clearAllButton.click();
      // }
    }
  }
];
