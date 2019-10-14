import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { toCamelCase } from '../../shared/utility';
import { MgtData } from '../../shared/mgt-card/mgt-card.component';

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrls: ['./video-management.component.scss']
})
export class VideoManagementComponent implements OnInit {

  // Determine current mode
  mode: string = 'view';

  categoryForm = this.fb.group({
    categories: this.fb.array([
      this.fb.group(
        {
          tag: 'helloWorld',
          text: 'Hello World',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      ),
      this.fb.group(
        {
          tag: 'helloWorld2',
          text: 'Hello World 2',
          status: 'inUsed'
        }
      )
    ]),
    // Frontend only control
    newCategory: ['']
  });

  // Video statistics
  totalPublished: number = 0;
  totalDrafts: number = 0;
  videoTypeSelection: string = 'all';
  videoCategorySelection: string = 'all';

  // Full video list
  fullVideoList: MgtData[] = [];
  // Video list shown after filter
  filteredVideolist: MgtData[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryForm.disable();
    this.mode = 'view';
    // TODO: Replace this line with actual API call
    this.fullVideoList = [
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/1',
        status: 'published',
        datePublished: 'Sep 21, 2019',
        category: 'helloWorld',
        title: 'Toyota Spec Commercial | “Safety First”',
        coverImg: 'https://img.youtube.com/vi/Ehhb7LJJv60/maxresdefault.jpg'
      },
      {
        link: '/videos/view/2',
        status: 'draft',
        datePublished: null,
        category: 'helloWorld2',
        title: '7 Days Since Death',
        coverImg: 'https://img.youtube.com/vi/fYEtth_sB9M/maxresdefault.jpg'
      }
    ];
    this.filterVideo();
    this.setUpVideoStats();
  }

  // On user clicks on the edit button
  onEdit(): void {
    this.categoryForm.enable();
    this.mode = 'edit';
  }

  // On user clicks on the add button
  onAdd(): void {
    const categoryArray = <FormArray> this.categoryForm.get('categories');
    const newCategory = this.categoryForm.get('newCategory').value;
    if (!newCategory) {
      return;
    }
    const tag = toCamelCase(newCategory);
    for (let i = 0; i < categoryArray.controls.length; i++) {
      const oldCategory = categoryArray.at(i);
      if (oldCategory.get('tag').value === tag) {
        // TODO: Show warning message
        window.alert('The same category already exist');
        return;
      }
    }
    (categoryArray).push(this.fb.group({
      tag: [tag],
      text: [newCategory],
      status: ['new']
    }));
  }

  // On user clicks on the remove button on any category
  onRemoveCategory(index: number): void {
    const categoryArray = <FormArray> this.categoryForm.get('categories');
    const category = <FormGroup> categoryArray.at(index);
    if (category.get('status').value !== 'inUsed') {
      categoryArray.removeAt(index);
    } else {
      // TODO: Show warning message
      window.alert(`${category.get('text').value} is currently in used`);
    }
  }

  // On user clicks save form
  saveForm(): void {
    // Disable the form
    this.categoryForm.disable();
    // Update mode
    this.mode = 'view';
  }

  // On user clicks on the cancel button
  onCancel(): void {
    // Disable the form
    this.categoryForm.disable();
    // Update mode
    this.mode = 'view';
    // TODO: Reset profileForm back to original data
  }

  // Set up video statistic number
  setUpVideoStats(): void {
    this.totalPublished = 0;
    this.totalDrafts = 0;
    this.fullVideoList.forEach(video => {
      if (video.status === 'published') {
        this.totalPublished++;
      } else {
        this.totalDrafts++;
      }
    });
  }

  /**
   * Video related functions
   */
  // On user selects video category or video type, filter videos shown
  filterVideo(): void {
    this.filteredVideolist = this.fullVideoList.filter(obj => {
      return (obj.category === this.videoCategorySelection || this.videoCategorySelection === 'all') &&
             (obj.status === this.videoTypeSelection || this.videoTypeSelection === 'all');
    });
  }
}
