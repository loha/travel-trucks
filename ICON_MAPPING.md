# Icon Mapping - API to Sprite

This document shows the mapping between API property names and sprite icon names after optimization.

## Feature Icons (API Properties → Sprite Icon Names)

| API Property | Sprite Icon Name | Description |
|-------------|------------------|-------------|
| `transmission` | `transmission` | Transmission type (automatic/manual) |
| `engine` | `gas` | Engine type (diesel/petrol/hybrid) |
| `AC` | `AC` | Air conditioning |
| `bathroom` | `bathroom` | Bathroom facility |
| `kitchen` | `kitchen` | Kitchen facility |
| `TV` | `TV` | Television |
| `radio` | `radio` | Radio |
| `refrigerator` | `refrigerator` | Refrigerator |
| `microwave` | `microwave` | Microwave oven |
| `gas` | `gas` | Gas supply |
| `water` | `water` | Water supply |

## Vehicle Form Icons (API Property → Sprite Icon Names)

| API Value | Sprite Icon Name | Display Name |
|-----------|------------------|--------------|
| `panelTruck` | `panelTruck` | Van |
| `fullyIntegrated` | `fullyIntegrated` | Fully Integrated |
| `alcove` | `alcove` | Alcove |

## UI Icons

| Usage | Sprite Icon Name | Description |
|-------|------------------|-------------|
| Rating (filled) | `star-active` | Active/filled star for ratings |
| Rating (empty) | `star` | Empty star for ratings |
| Location | `map` | Location/map pin icon |
| Location (active) | `map-active` | Active location/map pin |

## Changes Made

### Icon Name Updates (Old → New)
- `Van` → `panelTruck` (to match API)
- `Alcove` → `alcove` (lowercase for consistency)
- `Fully-Integrated` → `fullyIntegrated` (camelCase)
- `automatic` → `transmission` (to match API property)
- `Gas` → `gas` (lowercase, used for both engine and gas supply)
- `Water` → `water` (lowercase)
- `Microwave` → `microwave` (lowercase)
- `Map` → `map` (lowercase)
- `Map-active` → `map-active` (lowercase with hyphen)
- `Bathroom` → `bathroom` (lowercase)
- `Star` → `star` (lowercase)
- `Star-active` → `star-active` (lowercase with hyphen)
- `Refrigerator` → `refrigerator` (lowercase)
- `ac` → `AC` (uppercase to match API)
- `tv` → `TV` (uppercase to match API)

### New Icons Added
- `kitchen` - Kitchen facility icon (3 steam lines)
- `radio` - Radio icon (classic radio design)

## Component Updates

All components have been updated to use the new icon names:
- ✅ `CamperCard.jsx` - Feature icons, stars, map
- ✅ `Filters.jsx` - All filter icons
- ✅ `Features.jsx` - All feature icons
- ✅ `Reviews.jsx` - Star ratings
- ✅ `DetailsPage.jsx` - Star and map icons

## Usage Example

```jsx
import Icon from '../Icon/Icon';

// Feature icon
<Icon name="transmission" width={20} height={20} stroke="none" fill="none" />

// API property mapping
<Icon name="AC" width={20} height={20} stroke="none" fill="none" />

// Rating star
<Icon name="star-active" width={16} height={16} fill="none" stroke="none" />

// Location
<Icon name="map" width={16} height={16} stroke="none" fill="none" />
```

## Verification

To verify all icons are displaying correctly:
1. ✅ Start dev server: `npm run dev`
2. ✅ Navigate to catalog page: `http://localhost:5173/catalog`
3. ✅ Check feature icons on camper cards
4. ✅ Check filter icons in sidebar
5. ✅ Check star ratings
6. ✅ Click "Show more" to verify detail page icons
7. ✅ Check Features and Reviews tabs

## Notes

- All icon names now match the exact API response property names
- Icon names use consistent casing (lowercase for most, uppercase for AC/TV to match API)
- Form icons use camelCase (panelTruck, fullyIntegrated, alcove)
- UI icons use lowercase with hyphens (star-active, map-active)
- All icons in the sprite use proper SVG symbol format with viewBox
- Icons are styled via CSS, not inline fill/stroke attributes
