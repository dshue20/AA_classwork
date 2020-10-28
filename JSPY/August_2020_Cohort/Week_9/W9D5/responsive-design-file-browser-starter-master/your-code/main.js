class DirectoryTreeNode {
    constructor(name, type, lastModifiedTime) {
      this.name = name;
      this.type = type;
      this.lastModifiedTime = lastModifiedTime;
      this.children = [];
    }

    getIconTypeName() {
        if (this.type === 'directory') {
          return this.name;
        }
    
        if (this.type === 'file') {
          const dotIndex = this.name.lastIndexOf('.');
          if (dotIndex >= 0) {
            return this.name.substring(dotIndex + 1).toLowerCase();
          }
          return this.name;
        }
    
        return '';
    }

    addChild(child) {
        this.children.push(child);
    }
}

function updateVisualTree(element, directoryTreeNode) {

    // Create an unordered list to make a UI for the directoryTreeNode
    const ul = document.createElement('ul');
    ul.classList.add('tree');
  
    // Create a list element for every child of the directoryTreeNode
    for (let child of directoryTreeNode.children) {
      updateVisualTreeEntry(ul, child);
    }
  
    // Update the tree with the newly created unordered list.
    element.appendChild(ul);
  }
  
  function updateVisualTreeEntry(treeElement, child) {
    const li = document.createElement('li');
      li.classList.add('tree-entry');
  
      // Create a list element with a file icon
      if (child.type === 'file') {
        li.innerHTML = `
          <div class="tree-entry__disclosure tree-entry__disclosure--disabled"></div>
          <img class="tree-entry__icon" src="/icons/file_type_${child.getIconTypeName()}.svg">
          <div class="tree-entry__name">${child.name}</div>
          <div class="tree-entry__time">${child.lastModifiedTime}</div>
        `;
  
      // Or create a list element with a folder icon
      } else if (child.type === 'directory') {
        li.innerHTML = `
          <div class="tree-entry__disclosure tree-entry__disclosure--closed"></div>
          <img class="tree-entry__icon" src="/icons/folder_type_${child.getIconTypeName()}.svg">
          <div class="tree-entry__name">${child.name}</div>
          <div class="tree-entry__time">${child.lastModifiedTime}</div>
        `;
      }
  
      // Add the newly created list element into the unordered list
      treeElement.appendChild(li);
  }

  const dataTreeRoot = new DirectoryTreeNode();

  window.addEventListener('DOMContentLoaded', async () => {
    const overlay = document.getElementById('loading-overlay');
  
    try {
      const response = await fetch('/api/path');
  
      // If the fetch was successful, format the response in JSON and
      // create a DirectoryTreeNode for each file
      if (response.ok) {
        const files = await response.json();
        for (let file of files) {
          const { name, type, lastModifiedTime } = file;
          const node = new DirectoryTreeNode(name, type, lastModifiedTime);
  
          // Append each new node to the tree's root
          dataTreeRoot.addChild(node);
        }
  
        // Hide the `Loading...` overlay upon successful fetch
        overlay.classList.add('overlay--hidden');
      }
  
      // Update the DOM tree with information from dataTreeRoot
      const uiTreeRoot = document.querySelector('#tree-section');
      updateVisualTree(uiTreeRoot, dataTreeRoot);
  
    // Console log errors and add a red overlay to alert the user of errors
    } catch (e) {
      console.error(e);
      overlay.classList.add('overlay--error');
    }
  });