const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

// collection for org
const orgDataSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    collection: 'org'
  }
)

// collection for clients
const clientDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phoneNumber: {
      primary: {
        type: String,
        required: true
      },
      alternate: {
        type: String
      }
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    orgs: {
      type: [{ type: String, ref: 'org' }],
      required: true,
      validate: [(org) => org.length > 0, 'needs at least one org']
    }
  },
  {
    collection: 'client',
    timestamps: true
  }
)

// collection for events
const eventDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    org: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    services: [
      {
        //Changed the services field in the events collection to reference the services collection
        type: String,
        ref: 'services'
      }
    ],
    date: {
      type: Date,
      required: true
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    description: {
      type: String
    },
    attendees: [
      {
        type: String,
        ref: 'client'
      }
    ]
  },
  {
    collection: 'event'
  }
)

// collection for login
const loginDataSchema = new Schema(
  {
    //_id: { type: String, default: uuid.v1 }, You don't need to create another id, rather just embedd the client id
    username: {
      type: String,
      required: true //Username and password have to be required
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    client: {
      //Instead of creating a new id just reference the one from the client collection
      _id: { type: String, ref: 'client' },
      orgs: { type: String, ref: 'client' }
    }
  },
  {
    collection: 'login'
  }
)

// hash the password
loginDataSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
loginDataSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}


// collection for services
const serviceDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    service_name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    org: {
      //Edited the org field to be required and work properly
      type: String,
      required: true,
      ref: 'org'
    }
  },
  {
    collection: 'services'
  }
)


// create models from mongoose schemas
const clients = mongoose.model('client', clientDataSchema)
const orgs = mongoose.model('org', orgDataSchema)
const events = mongoose.model('event', eventDataSchema)
const services = mongoose.model('services', serviceDataSchema)
const login = mongoose.model('login', loginDataSchema)

// package the models in an object to export
module.exports = { clients, orgs, events, services, login }
