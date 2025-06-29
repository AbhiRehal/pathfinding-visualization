export const tourSteps = [
  {
    element: '.title-button',
    disableActiveInteraction: true,
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
    element: null,
    popover: {
      title: "What's a pathfinding algorithm?",
      description:
        'Pathfinding algorithms do as the name suggests and determine how to get from point A to B.</br></br><img src="/assets/pathfinding-demo.gif" alt="Pathfinding demo"/>',
      onPopoverRender: (popover, { config, state, driver }) => {
        setTimeout(() => driver.refresh(), 200);
      }
    }
  },
  {
    element: '.generate-maze-dropdown',
    disableActiveInteraction: true,
    popover: {
      description: 'Select an algorithm you would like to use to generate a maze.',
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
    element: '.generate-maze-button',
    disableActiveInteraction: true,
    popover: {
      description:
        'You can then use this button to generate the maze.</br></br>Or you can even draw your own by clicking and dragging your mouse on the grid!</br></br><img src="/assets/walls.gif" alt="Wall placing gif"/>',
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
    element: '.algorithm-dropdown',
    disableActiveInteraction: true,
    popover: {
      description: "Select the pathfinding algorithm you'd like to visualize...",
      align: 'center',
      side: 'left'
    },
    onHighlighted: element => {
      element.classList.add('idle');
    },
    onDeselected: element => {
      element.classList.remove('idle');
    }
  },
  {
    element: '.visualize-button',
    disableActiveInteraction: true,
    popover: {
      description: 'and visualize it!',
      align: 'center',
      side: 'left'
    },
    onHighlighted: element => {
      element.classList.add('idle');
    },
    onDeselected: element => {
      element.classList.remove('idle');
    }
  },
  {
    element: '.sidebar-button',
    disableActiveInteraction: true,
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
    }
  }
];
