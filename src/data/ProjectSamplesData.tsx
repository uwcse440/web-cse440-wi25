import { ProjectSamplesStore } from "@/types/ProjectSamplesStore";

/**
 * A key for each sample project.
 */
export const ProjectSamplesProjectKeyValues = [
  "borewalk",
  "dawgsense",
  "gemhunter",
  "planventure",
  "potpal",
  "preparebear",
  "titled",
  "wanderlust",
] as const;

/**
 * A key for each sample milestone.
 *
 * Each project will provide each of these sample milestones.
 */
export const ProjectSamplesMilestoneKeyValues = [
  "assignment1b",
  "assignment1c",
  "assignment2a",
  "assignment2b",
  "assignment2c",
  "assignment3a",
  "assignment3b",
  "assignment3d",
  "assignment4a",
  "assignment4b",
  "assignment4c",
  "assignment5mockup",
  "assignment5poster",
] as const;

/**
 * The actual ProjectSamplesStore.
 */
const PROJECT_SAMPLE_STORE: ProjectSamplesStore = {
  samples: {
    borewalk: {
      name: "Borewalk",
      link: "https://courses.cs.washington.edu/courses/cse440/24au/projects/boredwalk",
      sampleCanvasLinks: {
        assignment1b: "https://canvas.uw.edu/files/128662052",
        assignment1c: "https://canvas.uw.edu/files/128661995",
        assignment2a: "https://canvas.uw.edu/files/128662025",
        assignment2b: "https://canvas.uw.edu/files/128661988",
        assignment2c: "https://canvas.uw.edu/files/128662035", 
        assignment3a: "https://canvas.uw.edu/files/128662050",
        assignment3b: "https://canvas.uw.edu/files/128662016",
        assignment3d: "https://canvas.uw.edu/files/128662048",
        assignment4a: "https://canvas.uw.edu/files/128662051",
        assignment4b: "https://canvas.uw.edu/files/128662070",
        assignment4c: "https://canvas.uw.edu/files/128662067", 
        assignment5mockup: "https://canvas.uw.edu/files/128662054",
        assignment5poster: "https://canvas.uw.edu/files/128662071",
      },
    },
    dawgsense: {
        name: "Dawgsense",
        link: "https://courses.cs.washington.edu/courses/cse440/24au/projects/dawgsense",
        sampleCanvasLinks: {
          assignment1b: "https://canvas.uw.edu/files/128662281",
          assignment1c: "https://canvas.uw.edu/files/128662282",
          assignment2a: "https://canvas.uw.edu/files/128662283",
          assignment2b: "https://canvas.uw.edu/files/128662285",
          assignment2c: "https://canvas.uw.edu/files/128662287", 
          assignment3a: "https://canvas.uw.edu/files/128662286",
          assignment3b: "https://canvas.uw.edu/files/128662288",
          assignment3d: "https://canvas.uw.edu/files/128662309",
          assignment4a: "https://canvas.uw.edu/files/128662290",
          assignment4b: "https://canvas.uw.edu/files/128662299",
          assignment4c: "https://canvas.uw.edu/files/128662373", 
          assignment5mockup: "https://canvas.uw.edu/files/128662345",
          assignment5poster: "https://canvas.uw.edu/files/128662329",
        },
    },
    gemhunter: {
        name: "Gem Hunter",
        link: "https://courses.cs.washington.edu/courses/cse440/24au/projects/gemhunter",
        sampleCanvasLinks: {
            assignment1b: "https://canvas.uw.edu/files/128662377",
            assignment1c: "https://canvas.uw.edu/files/128662379",
            assignment2a: "https://canvas.uw.edu/files/128662422",
            assignment2b: "https://canvas.uw.edu/files/128662382",
            assignment2c: "https://canvas.uw.edu/files/128662396",
            assignment3a: "https://canvas.uw.edu/files/128662381",
            assignment3b: "https://canvas.uw.edu/files/128662411",
            assignment3d: "https://canvas.uw.edu/files/128662380",
            assignment4a: "https://canvas.uw.edu/files/128662388",
            assignment4b: "https://canvas.uw.edu/files/128662416",
            assignment4c: "https://canvas.uw.edu/files/128662412",
            assignment5mockup: "https://canvas.uw.edu/files/128662415",
            assignment5poster: "https://canvas.uw.edu/files/128662420",
        },
    },
    planventure: {
        name: "Planventure",
        link: "https://courses.cs.washington.edu/courses/cse440/24au/projects/planventure",
        sampleCanvasLinks: {
            assignment1b: "https://canvas.uw.edu/files/128662493",
            assignment1c: "https://canvas.uw.edu/files/128662496",
            assignment2a: "https://canvas.uw.edu/files/128662482",
            assignment2b: "https://canvas.uw.edu/files/128662485",
            assignment2c: "https://canvas.uw.edu/files/128662497",
            assignment3a: "https://canvas.uw.edu/files/128662492",
            assignment3b: "https://canvas.uw.edu/files/128662494",
            assignment3d: "https://canvas.uw.edu/files/128662489",
            assignment4a: "https://canvas.uw.edu/files/128662483",
            assignment4b: "https://canvas.uw.edu/files/128662501",
            assignment4c: "https://canvas.uw.edu/files/128662498",
            assignment5mockup: "https://canvas.uw.edu/files/128662502",
            assignment5poster: "https://canvas.uw.edu/files/128662503",
        },
    },
    potpal: {
        name: "Pot Pal",
        link: "https://courses.cs.washington.edu/courses/cse440/24au/projects/potpal",
        sampleCanvasLinks: {
            assignment1b: "https://canvas.uw.edu/files/128662768",
            assignment1c: "https://canvas.uw.edu/files/128662770",
            assignment2a: "https://canvas.uw.edu/files/128662765",
            assignment2b: "https://canvas.uw.edu/files/128662769",
            assignment2c: "https://canvas.uw.edu/files/128662728",
            assignment3a: "https://canvas.uw.edu/files/128662772",
            assignment3b: "https://canvas.uw.edu/files/128662741",
            assignment3d: "https://canvas.uw.edu/files/128662751",
            assignment4a: "https://canvas.uw.edu/files/128662767",
            assignment4b: "https://canvas.uw.edu/files/128662766",
            assignment4c: "https://canvas.uw.edu/files/128662773",
            assignment5mockup: "https://canvas.uw.edu/files/128662779",
            assignment5poster: "https://canvas.uw.edu/files/128662775",
        }
    },
    preparebear: {
        name: "Prepare Bear",
        link: "https://courses.cs.washington.edu/courses/cse440/24au/projects/preparebear",
        sampleCanvasLinks: {
            assignment1b: "https://canvas.uw.edu/files/128662795",
            assignment1c: "https://canvas.uw.edu/files/128662786",
            assignment2a: "https://canvas.uw.edu/files/128662789",
            assignment2b: "https://canvas.uw.edu/files/128662782",
            assignment2c: "https://canvas.uw.edu/files/128662787",
            assignment3a: "https://canvas.uw.edu/files/128662785",
            assignment3b: "https://canvas.uw.edu/files/128662790",
            assignment3d: "https://canvas.uw.edu/files/128662791",
            assignment4a: "https://canvas.uw.edu/files/128662794",
            assignment4b: "https://canvas.uw.edu/files/128662801",
            assignment4c: "https://canvas.uw.edu/files/128662800",
            assignment5mockup: "https://canvas.uw.edu/files/128662799",
            assignment5poster: "https://canvas.uw.edu/files/128662802",
        }
    },
    titled: {
        name: "Tilted",
        link: "https://courses.cs.washington.edu/courses/cse440/24au/projects/tiltd",
        sampleCanvasLinks: {
            assignment1b: "https://canvas.uw.edu/files/128660482",
            assignment1c: "https://canvas.uw.edu/files/128660486",
            assignment2a: "https://canvas.uw.edu/files/128660488",
            assignment2b: "https://canvas.uw.edu/files/128660487",
            assignment2c: "https://canvas.uw.edu/files/128660478",
            assignment3a: "https://canvas.uw.edu/files/128660484",
            assignment3b: "https://canvas.uw.edu/files/128660485",
            assignment3d: "https://canvas.uw.edu/files/128660490",
            assignment4a: "https://canvas.uw.edu/files/128660480",
            assignment4b: "https://canvas.uw.edu/files/128660481",
            assignment4c: "https://canvas.uw.edu/files/128660491",
            assignment5mockup: "https://canvas.uw.edu/files/128660496",
            assignment5poster: "https://canvas.uw.edu/files/128660492",
        }
    },
    wanderlust: {
        name: "Wanderlust",
        link: "https://courses.cs.washington.edu/courses/cse440/24au/projects/wanderlust",
        sampleCanvasLinks: {
            assignment1b: "https://canvas.uw.edu/files/128662966",
            assignment1c: "https://canvas.uw.edu/files/128662972",
            assignment2a: "https://canvas.uw.edu/files/128662977",
            assignment2b: "https://canvas.uw.edu/files/128662979",
            assignment2c: "https://canvas.uw.edu/files/128662974",
            assignment3a: "",
            assignment3b: "https://canvas.uw.edu/files/128662968",
            assignment3d: "https://canvas.uw.edu/files/128662971",
            assignment4a: "https://canvas.uw.edu/files/128662978",
            assignment4b: "https://canvas.uw.edu/files/128662970",
            assignment4c: "https://canvas.uw.edu/files/128662985",
            assignment5mockup: "https://canvas.uw.edu/files/128662981",
            assignment5poster: "https://canvas.uw.edu/files/128662980",
        }
    }

  },
};

export const getProjectSamplesStore: () => ProjectSamplesStore = () => {
  return PROJECT_SAMPLE_STORE;
};
