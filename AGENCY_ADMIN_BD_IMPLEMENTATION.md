# Agency Admin (BD) সিস্টেম ইমপ্লিমেন্টেশন ডকুমেন্টেশন

## সারসংক্ষেপ
বর্তমানে এজেন্সি এক্সেস শুধুমাত্র এডমিন প্যানেল থেকে দেওয়া যায়। এখন একটি নতুন সিস্টেম তৈরি করতে হবে যেখানে **Agency Admin (BD)** নামে একটি আলাদা এডমিন সিস্টেম থাকবে।

---

## প্রয়োজনীয় ফিচারসমূহ

### ✅ ১. Agency Admin (BD) - এজেন্সি তৈরি ও নাম পরিবর্তন

**কি করতে হবে:**

#### Backend API প্রয়োজন:
1. **এজেন্সি তৈরি করার API**
   - `POST /agency/create` 
   - Request Body: `{ name, email, mobile, password, bdId }`
   - Response: `{ status, message, data: { agency } }`

2. **এজেন্সি নাম পরিবর্তন করার API**
   - `PATCH /agency/updateName/:agencyId`
   - Request Body: `{ name }`
   - Response: `{ status, message, data: { agency } }`

#### Frontend Implementation:

**নতুন Redux Actions যোগ করতে হবে:**
- `src/store/agencyAdmin/action.js` (নতুন ফাইল তৈরি)
  ```javascript
  // এজেন্সি তৈরি
  export const createAgency = (data) => (dispatch) => {
    axios.post(`agency/create?key=${key}`, data)
      .then((res) => {
        if (res.data.status) {
          Toast("success", "Agency created successfully");
          dispatch({ type: CREATE_AGENCY, payload: res.data.data });
        }
      })
  };

  // এজেন্সি নাম আপডেট
  export const updateAgencyName = (agencyId, name) => (dispatch) => {
    axios.patch(`agency/updateName/${agencyId}?key=${key}`, { name })
      .then((res) => {
        if (res.data.status) {
          Toast("success", "Agency name updated successfully");
          dispatch({ type: UPDATE_AGENCY_NAME, payload: res.data.data });
        }
      })
  };
  ```

**নতুন Redux Types:**
- `src/store/agencyAdmin/types.js` (নতুন ফাইল)
  ```javascript
  export const CREATE_AGENCY = "CREATE_AGENCY";
  export const UPDATE_AGENCY_NAME = "UPDATE_AGENCY_NAME";
  export const GET_BD_AGENCIES = "GET_BD_AGENCIES";
  export const DELETE_AGENCY = "DELETE_AGENCY";
  ```

**নতুন Page Component:**
- `src/pages/agencyAdmin/AgencyManagement.js` (নতুন ফাইল)
  - এজেন্সি তৈরি করার ফর্ম
  - এজেন্সি লিস্ট দেখানো
  - এজেন্সি নাম এডিট করার ফাংশনালিটি

---

### ✅ ২. Agency Admin - হোষ্ট সংখ্যা ও টার্গেট দেখানো

**কি করতে হবে:**

#### Backend API প্রয়োজন:
1. **এজেন্সির হোষ্ট সংখ্যা ও টার্গেট দেখানোর API**
   - `GET /agency/hostStats?agencyId={agencyId}`
   - Response: 
     ```json
     {
       "status": true,
       "data": {
         "totalHosts": 25,
         "agencyTarget": 100000,
         "hostTargets": [
           { "hostId": "...", "hostName": "...", "target": 5000 }
         ],
         "totalAgencyTarget": 100000,
         "currentAgencyProgress": 75000
       }
     }
     ```

#### Frontend Implementation:

**Redux Action যোগ করতে হবে:**
- `src/store/agencyAdmin/action.js` এ যোগ করুন:
  ```javascript
  export const getAgencyHostStats = (agencyId) => (dispatch) => {
    axios.get(`agency/hostStats?agencyId=${agencyId}`)
      .then((res) => {
        if (res.data.status) {
          dispatch({ 
            type: GET_AGENCY_HOST_STATS, 
            payload: res.data.data 
          });
        }
      })
  };
  ```

**নতুন Page Component:**
- `src/pages/agencyAdmin/AgencyDashboard.js` (নতুন ফাইল)
  - এজেন্সির হোষ্ট সংখ্যা দেখানো
  - এজেন্সি টার্গেট দেখানো
  - হোষ্ট-ওয়াইজ টার্গেট দেখানো
  - Progress bar/chart দিয়ে ভিজুয়ালাইজেশন

**UI Component:**
- Dashboard এ দেখাতে হবে:
  - Total Hosts: 25
  - Agency Target: ₹1,00,000
  - Current Progress: ₹75,000 (75%)
  - Host-wise target breakdown (table/list)

---

### ✅ ৩. Agency Admin (BD) - BD এর এজেন্সি দেখানো, সার্চ ও ডিলিট

**কি করতে হবে:**

#### Backend API প্রয়োজন:
1. **BD এর সব এজেন্সি দেখানোর API**
   - `GET /agency/getBDAgencies?bdId={bdId}&start={page}&limit={limit}`
   - Response:
     ```json
     {
       "status": true,
       "data": [...agencies],
       "total": 50
     }
     ```

2. **এজেন্সি কোড দিয়ে সার্চ করার API**
   - `GET /agency/searchByCode?bdId={bdId}&code={agencyCode}`
   - Response: `{ status, data: { agency } }`

3. **এজেন্সি ডিলিট করার API**
   - `DELETE /agency/delete/:agencyId?bdId={bdId}`
   - Response: `{ status, message }`

#### Frontend Implementation:

**Redux Actions যোগ করতে হবে:**
- `src/store/agencyAdmin/action.js` এ যোগ করুন:
  ```javascript
  // BD এর সব এজেন্সি পাওয়া
  export const getBDAgencies = (bdId, page = 1, limit = 20) => (dispatch) => {
    axios.get(`agency/getBDAgencies?bdId=${bdId}&start=${page}&limit=${limit}`)
      .then((res) => {
        if (res.data.status) {
          dispatch({ 
            type: GET_BD_AGENCIES, 
            payload: { 
              agencies: res.data.data, 
              total: res.data.total 
            } 
          });
        }
      })
  };

  // এজেন্সি কোড দিয়ে সার্চ
  export const searchAgencyByCode = (bdId, code) => (dispatch) => {
    axios.get(`agency/searchByCode?bdId=${bdId}&code=${code}`)
      .then((res) => {
        if (res.data.status) {
          dispatch({ 
            type: SEARCH_AGENCY_BY_CODE, 
            payload: res.data.data 
          });
        }
      })
  };

  // এজেন্সি ডিলিট
  export const deleteAgency = (bdId, agencyId) => (dispatch) => {
    if (window.confirm("Are you sure you want to delete this agency?")) {
      axios.delete(`agency/delete/${agencyId}?bdId=${bdId}`)
        .then((res) => {
          if (res.data.status) {
            Toast("success", "Agency deleted successfully");
            dispatch({ type: DELETE_AGENCY, payload: agencyId });
            // Refresh the list
            dispatch(getBDAgencies(bdId));
          }
        })
    }
  };
  ```

**নতুন Page Component:**
- `src/pages/agencyAdmin/BDAgencyList.js` (নতুন ফাইল)
  - এজেন্সি লিস্ট টেবিল
  - সার্চ বার (এজেন্সি কোড দিয়ে)
  - প্রতিটি এজেন্সির জন্য:
    - এজেন্সি নাম
    - এজেন্সি কোড
    - হোষ্ট সংখ্যা
    - টার্গেট
    - ডিলিট বাটন
  - Pagination

---



---

## Routing Structure

**App.js এ নতুন routes যোগ করতে হবে:**

```javascript
<Route path="/agencypanel" element={<AgencyLayout />}>
  {/* Existing routes */}
  <Route path="homePage" element={<Admin />} />
  <Route path="Income" element={<TotalIncome />} />
  <Route path="creators" element={<Creators />} />
  
  {/* New Agency Admin BD routes */}
  <Route path="bd/agencies" element={<BDAgencyList />} />
  <Route path="bd/create-agency" element={<AgencyManagement />} />
  <Route path="bd/dashboard" element={<AgencyDashboard />} />
</Route>
```

---

## Database Schema Changes (Backend)

### Agency Model এ নতুন fields যোগ করতে হবে:

```javascript
{
  name: String,
  agencyCode: String,
  bdId: ObjectId, // Reference to BD Admin
  target: Number, // Agency target
  createdAt: Date,
  // ... existing fields
}
```

### User Model (BD Admin) এ:
```javascript
{
  name: String,
  email: String,
  role: "agencyAdminBD",
  bdId: String, // Unique BD identifier
  // ... existing fields
}
```

---

## Step-by-Step Implementation Checklist

### Phase 1: Backend Setup
- [ ] Agency model এ `bdId` field যোগ করুন
- [ ] Agency model এ `target` field যোগ করুন
- [ ] Login API তে role return করুন
- [ ] Create Agency API তৈরি করুন
- [ ] Update Agency Name API তৈরি করুন
- [ ] Get BD Agencies API তৈরি করুন
- [ ] Search Agency by Code API তৈরি করুন
- [ ] Delete Agency API তৈরি করুন
- [ ] Get Agency Host Stats API তৈরি করুন
- [ ] Role-based middleware তৈরি করুন

### Phase 2: Frontend Redux Setup
- [ ] `src/store/agencyAdmin/` folder তৈরি করুন
- [ ] `types.js` file তৈরি করুন
- [ ] `action.js` file তৈরি করুন (সব actions যোগ করুন)
- [ ] `reducer.js` file তৈরি করুন
- [ ] `src/store/index.js` এ reducer register করুন

### Phase 3: UI Components
- [ ] `src/pages/agencyAdmin/AgencyManagement.js` তৈরি করুন
- [ ] `src/pages/agencyAdmin/BDAgencyList.js` তৈরি করুন
- [ ] `src/pages/agencyAdmin/AgencyDashboard.js` তৈরি করুন
- [ ] Agency create/edit form component
- [ ] Agency search component
- [ ] Agency list table component
- [ ] Host stats display component

### Phase 4: Routing & Navigation
- [ ] `App.js` এ নতুন routes যোগ করুন
- [ ] `AgencyLayout.js` এ navigation menu আপডেট করুন
- [ ] Role-based route protection যোগ করুন

### Phase 5: Testing
- [ ] Agency Admin BD login test করুন
- [ ] Agency create test করুন
- [ ] Agency name update test করুন
- [ ] Agency search test করুন
- [ ] Agency delete test করুন
- [ ] Host stats display test করুন

---

## API Endpoints Summary

### Agency Admin (BD) Endpoints:
1. `POST /agency/create` - এজেন্সি তৈরি
2. `PATCH /agency/updateName/:agencyId` - এজেন্সি নাম আপডেট
3. `GET /agency/getBDAgencies?bdId={bdId}` - BD এর সব এজেন্সি
4. `GET /agency/searchByCode?bdId={bdId}&code={code}` - কোড দিয়ে সার্চ
5. `DELETE /agency/delete/:agencyId?bdId={bdId}` - এজেন্সি ডিলিট

### Agency Admin Endpoints:
1. `GET /agency/hostStats?agencyId={agencyId}` - হোষ্ট স্ট্যাটস ও টার্গেট

---

## Important Notes

1. **Security:**
   - সব API calls এ `bdId` verify করতে হবে
   - শুধুমাত্র নিজের BD এর এজেন্সি access করতে পারবে
   - Delete operation এ confirmation dialog দিতে হবে

2. **Error Handling:**
   - Network errors handle করতে হবে
   - API errors user-friendly message দিয়ে দেখাতে হবে
   - Loading states যোগ করতে হবে

3. **UI/UX:**
   - Responsive design করতে হবে
   - Loading spinners যোগ করতে হবে
   - Success/Error toast messages দেখাতে হবে
   - Confirmation dialogs delete এর জন্য

4. **Data Validation:**
   - Agency name validation (required, min length)
   - Agency code uniqueness check
   - Email format validation

---

## Example Code Structure

```
src/
├── pages/
│   └── agencyAdmin/
│       ├── AgencyManagement.js
│       ├── BDAgencyList.js
│       └── AgencyDashboard.js
├── store/
│   └── agencyAdmin/
│       ├── action.js
│       ├── reducer.js
│       └── types.js
└── util/
    └── RoleRouter.js
```

---

## Translation Keys (i18n)

নতুন translation keys যোগ করতে হবে `src/locale/en/translation.json` এবং অন্যান্য language files এ:

```json
{
  "agency_admin_bd": "Agency Admin (BD)",
  "create_agency": "Create Agency",
  "update_agency_name": "Update Agency Name",
  "agency_code": "Agency Code",
  "search_by_code": "Search by Agency Code",
  "total_hosts": "Total Hosts",
  "agency_target": "Agency Target",
  "host_target": "Host Target",
  "delete_agency": "Delete Agency",
  "confirm_delete": "Are you sure you want to delete this agency?",
  "agency_created": "Agency created successfully",
  "agency_deleted": "Agency deleted successfully",
  "agency_name_updated": "Agency name updated successfully"
}
```

---

## Conclusion

এই ডকুমেন্টেশন অনুসরণ করে Agency Admin (BD) সিস্টেম সম্পূর্ণভাবে implement করা যাবে। প্রতিটি phase সম্পন্ন করার পর testing করতে হবে এবং তারপর পরবর্তী phase এ যেতে হবে।
