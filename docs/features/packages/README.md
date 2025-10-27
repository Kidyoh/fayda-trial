# Packages Feature Documentation

## Overview

The packages feature provides a comprehensive system for displaying, searching, and purchasing educational packages. It includes featured packages on the homepage and a dedicated packages listing page.

## Architecture

### Directory Structure

```
src/app/(packages)/
├── access/
│   └── [single_course_id]/
│       ├── page.tsx                    # Course access page for purchased courses
│       └── test.rest                    # API testing file
├── details/
│   ├── [package_id]/
│   │   └── page.tsx                    # Package detail page wrapper
│   └── package_details_rendered.tsx    # Main package details component
└── packages/
    └── page.tsx                        # Packages listing page (NEW)
```

### Components

#### 1. Featured Packages Card (`src/components/homepage_components/package_cards.tsx`)

**Purpose:** Displays up to 2 featured packages on the homepage.

**Features:**

- Fetches data from `/packages/public/featured` endpoint
- Displays only 2 packages (limited by `.slice(0, 2)`)
- Shows package image, name, price, description, and courses count
- Displays discounted price with strikethrough on original price
- Includes "Add to Cart" and "View Details" buttons
- Ethiopian-themed gradient designs

**API Response Structure:**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "packageName": "string",
      "price": "string | number",
      "imgUrl": ["string"],
      "thumbnail": "string",
      "tag": "string",
      "packageDescription": "string",
      "courses": [],
      "temporaryPrice": "string | null",
      "discountStatus": boolean,
      "discountExpiryDate": "string | null"
    }
  ],
  "count": number
}
```

**Key Implementation:**

- Limits to 2 packages using `result.data.slice(0, 2)`
- Handles `imgUrl` as array, uses first element `imgUrl[0]`
- Shows discounted pricing when `discountStatus` is true

#### 2. Packages Listing Page (`src/app/(packages)/packages/page.tsx`)

**Purpose:** Full listing of all active packages with search and filter functionality.

**Features:**

- Fetches all active packages from `/packages/public/active` endpoint
- Search by package name or description
- Filter by package tags
- Grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
- Shows package count and filtered results
- Includes "Add to Cart" and "View Details" buttons for each package

**Navigation:**

- Accessible via main navbar "Packages" link
- Link updated from `/#packages` (hash) to `/packages` (dedicated page)

**Search & Filter:**

- Real-time search filtering
- Tag-based filtering (e.g., "Grade 12", "Computer", etc.)
- "All Packages" filter to show everything

#### 3. Package Details (`src/app/(packages)/details/[package_id]/page.tsx`)

**Purpose:** Individual package detail page showing full information.

**Files:**

- `page.tsx`: Route wrapper
- `package_details_rendered.tsx`: Main component (912 lines)

**Features:**

- Full package information display
- Course listings within package
- Purchase dialog
- Reviews and ratings
- Purchase history check

#### 4. Course Access (`src/app/(packages)/access/[single_course_id]/page.tsx`)

**Purpose:** Display purchased course content for enrolled students.

**Features:**

- Material content display (videos, notes, assessments)
- Progress tracking
- Forum integration
- Locked/unlocked material management

## API Endpoints

### Featured Packages

- **Endpoint:** `GET /packages/public/featured`
- **Returns:** Up to 2 featured packages
- **Used by:** Homepage featured packages section

### Active Packages

- **Endpoint:** `GET /packages/public/active`
- **Returns:** All active packages
- **Used by:** Packages listing page

### Package Details

- **Endpoint:** `GET /packages/:id`
- **Returns:** Single package details
- **Used by:** Package details page

## Navigation Updates

### Desktop Navbar (`src/components/main_components/nav_bar.tsx`)

- Changed from `<Link href="/#packages">` to `<Link href="/packages">`
- Added active state styling for `/packages` route

### Mobile Navbar (`src/components/main_components/nav_bar_mobile.tsx`)

- Updated hamburger menu link from `/#packages` to `/packages`
- Updated bottom navigation link from `/#packages` to `/packages`
- Added active state styling for both menu and bottom nav

## Removed Files

The following files were removed as they used deprecated endpoints:

### Deleted:

- `src/app/(packages)/explore/page.tsx` - Used `/packagefolder/coursemain` endpoint
- `src/app/(packages)/explore/[subfolder]/page.tsx` - Used `/pacakgefolder/coursesub/` endpoint
- `src/app/(packages)/explore/packageslist/[folderid]/page.tsx` - Used `/packages/fetchPackages/` endpoint

These files were using old API patterns and have been replaced by the new packages listing page.

## Data Flow

### Featured Packages

```
Homepage → PackageCards Component
  ↓
Fetches: GET /packages/public/featured
  ↓
Limits to 2 items (.slice(0, 2))
  ↓
Displays cards with pricing, images, descriptions
```

### Packages Listing

```
Navbar Link → /packages route
  ↓
PackagesPage Component
  ↓
Fetches: GET /packages/public/active
  ↓
Search & Filter applied
  ↓
Grid display with pagination
```

## Interface Definitions

### Package Interface

```typescript
interface Package {
  id: string;
  packageName: string;
  packageDescription: string;
  price: string | number;
  imgUrl: string[]; // Array of image URLs
  thumbnail: string;
  tag: string;
  courses?: any[];
  temporaryPrice?: string | null;
  discountStatus?: boolean;
  discountExpiryDate?: string | null;
}
```

## Key Features

### 1. Discount Pricing Display

When a package has an active discount:

- Original price shown with strikethrough
- Discounted price displayed prominently
- "Sale" badge indicator

### 2. Image Handling

- Supports multiple images in `imgUrl` array
- Uses first image (`imgUrl[0]`)
- Fallback to emoji if image fails to load
- Gradient background as secondary fallback

### 3. Responsive Design

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 2-3 columns
- All cards maintain consistent height and styling

## Testing

### Manual Testing Checklist

- [ ] Featured packages appear on homepage (max 2)
- [ ] Packages page loads all active packages
- [ ] Search functionality works on packages page
- [ ] Filter by tag works correctly
- [ ] Navigation links updated in both desktop and mobile navbars
- [ ] Add to Cart button functionality
- [ ] View Details button navigation
- [ ] Discount pricing displays correctly
- [ ] Image loading and fallbacks work

## Future Improvements

1. **Pagination:** Add pagination for large package lists
2. **Sorting:** Add sort by price, name, popularity
3. **Advanced Filters:** Add more filter options (price range, category)
4. **Wishlist:** Add wishlist functionality
5. **Favorites:** Allow users to favorite packages
6. **Recommendations:** Show personalized package recommendations

## Related Files

- Homepage: `src/app/page.tsx`
- Navbar: `src/components/main_components/nav_bar.tsx`
- Mobile Navbar: `src/components/main_components/nav_bar_mobile.tsx`
- Package Cards: `src/components/homepage_components/package_cards.tsx`
- Cart Button: `src/components/cart/AddToCartButton.tsx`
- API Config: `src/apiConfig.ts`

## Changelog

### 2025-02-08

- **Added:** Packages listing page at `/packages`
- **Updated:** Featured packages to show only 2 items
- **Updated:** Navbar navigation to use dedicated packages page
- **Removed:** Deprecated explore pages and old endpoints
- **Updated:** API endpoint from `/packages/fetchPackagesall/` to `/packages/public/featured`
- **Updated:** API response handling for new structure with `success`, `data`, and `count` fields
